package com.soluvel.conectre.core;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
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

    public GenericSpecification(List<String> attributes, String value, Class<T> type) {
        this.attributes = attributes;
        this.value = value;
        this.type = type;
    }

    public Specification<T> buildSpecification() {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (String attribute : attributes) {
                if (attribute.contains(".")) {
                    String[] parts = attribute.split("\\.");
                    Join<Object, Object> join = root.join(parts[0]);
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(join.get(parts[1])),
                            "%" + value.toLowerCase() + "%"
                    ));
                } else {
                    Field field = ReflectionUtils.findField(type, attribute);
                    if (field == null) {
                        throw new IllegalArgumentException("Atributo '" + attribute + "' não encontrado na entidade " + type.getName());
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
                        predicates.add(criteriaBuilder.or(enumPredicates.toArray(new Predicate[0])));
                    } else if (String.class.isAssignableFrom(fieldType)) {
                        predicates.add(criteriaBuilder.like(
                                criteriaBuilder.lower(root.get(attribute)),
                                "%" + value.toLowerCase() + "%"
                        ));
                    } else {
                        throw new IllegalArgumentException("Tipo de dado do atributo '" + attribute + "' não suportado para busca genérica.");
                    }
                }
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }
}
