package com.soluvel.conectre.core;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

public class GenericSpecification<T> {

    private final List<String> attributes;
    private final String value;
    private final Class<T> type;
    private final List<FixedCondition<T>> fixedConditions;

    public GenericSpecification(List<String> attributes, String value, Class<T> type, List<FixedCondition<T>> fixedConditions) {
        this.attributes = attributes;
        this.value = value;
        this.type = type;
        this.fixedConditions = fixedConditions != null ? fixedConditions : new ArrayList<>();
    }

    public Specification<T> buildSpecification() {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> fixedPredicates = new ArrayList<>();
            List<Predicate> dynamicPredicates = new ArrayList<>();

            // Add fixed conditions
            for (FixedCondition<T> condition : fixedConditions) {
                fixedPredicates.add(condition.toPredicate(root, query, criteriaBuilder));
            }

            // Add dynamic conditions
            for (String attribute : attributes) {
                if (attribute.contains(".")) {
                    String[] parts = attribute.split("\\.");
                    Path<?> path = root;
                    for (int i = 0; i < parts.length - 1; i++) {
                        path = path.get(parts[i]);
                    }
                    dynamicPredicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(path.get(parts[parts.length - 1]).as(String.class)),
                            "%" + value.toLowerCase() + "%"
                    ));
                } else {
                    Field field = ReflectionUtils.findField(type, attribute);
                    if (field == null) {
                        throw new IllegalArgumentException("Attribute '" + attribute + "' not found in entity " + type.getName());
                    }
                    field.setAccessible(true);
                    Class<?> fieldType = field.getType();
                    if (fieldType.isEnum()) {
                        Expression<Enum<?>> enumExpression = root.get(attribute);
                        Enum<?>[] enumConstants = (Enum<?>[]) fieldType.getEnumConstants();
                        List<Predicate> enumPredicates = new ArrayList<>();
                        for (Enum<?> enumValue : enumConstants) {
                            enumPredicates.add(criteriaBuilder.equal(enumExpression, enumValue));
                        }
                        dynamicPredicates.add(criteriaBuilder.or(enumPredicates.toArray(new Predicate[0])));
                    } else if (String.class.isAssignableFrom(fieldType)) {
                        dynamicPredicates.add(criteriaBuilder.like(
                                criteriaBuilder.lower(root.get(attribute)),
                                "%" + value.toLowerCase() + "%"
                        ));
                    } else if (Long.class.isAssignableFrom(fieldType) || long.class.isAssignableFrom(fieldType)) {
                        try {
                            Long longValue = Long.parseLong(value);
                            dynamicPredicates.add(criteriaBuilder.equal(root.get(attribute), longValue));
                        } catch (NumberFormatException e) {
                            throw new IllegalArgumentException("Value '" + value + "' cannot be converted to Long.");
                        }
                    } else {
                        throw new IllegalArgumentException("Data type of attribute '" + attribute + "' not supported for generic search.");
                    }
                }
            }

            Predicate dynamicPredicate = criteriaBuilder.or(dynamicPredicates.toArray(new Predicate[0]));
            fixedPredicates.add(dynamicPredicate);

            return criteriaBuilder.and(fixedPredicates.toArray(new Predicate[0]));
        };
    }

    @FunctionalInterface
    public interface FixedCondition<T> {
        Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);
    }
}
