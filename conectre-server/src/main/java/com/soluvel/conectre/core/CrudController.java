package com.soluvel.conectre.core;

import jakarta.persistence.criteria.Path;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public abstract class CrudController<T, R, ID extends Serializable> {

    private CrudService<T, ID> service;
    private final Mapper<T, R> mapper;
    private final Class<T> entityClass;

    public CrudController(CrudService<T, ID> service, Class<T> entityClass) {
        this(service, null, entityClass);
    }

    @GetMapping("/record")
    public ResponseEntity<List<?>> findAllRecord() {
        List<T> entityList = service.findAll();
        List<Object> recordList = entityList.stream()
                .map(entity -> mapper != null ? mapper.toRecord(entity) : entity)
                .collect(Collectors.toList());
        return new ResponseEntity<>(recordList, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<?>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return new ResponseEntity<>(service.count(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable("id") ID id) {
        return service.findById(id)
                .map(entity -> new ResponseEntity<>(mapper != null ? mapper.toRecord(entity) : entity, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/save")
    public ResponseEntity<?> create(@RequestBody Object object) {
        T t = mapper != null ? service.save(mapper.toEntity(castObjectToR(object))) : service.save(castObjectToT(object));
        return new ResponseEntity<>(mapper != null ? mapper.toRecord(t) : t, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable("id") ID id, @RequestBody T entity) {
        return service.findById(id)
                .map(value -> new ResponseEntity<>(service.save(entity), HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") ID id) {
        service.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/page/{number}/{size}")
    public ResponseEntity<Page<T>> page(@PathVariable int number, @PathVariable int size,
                                        @RequestParam(value = "filter", required = false) String filter,
                                        @RequestParam(value = "campo", required = false) String campo,
                                        @RequestParam(value = "valor", required = false) String valor,
                                        @RequestParam(value = "attributes", required = false) List<String> attributes) {

        if (Objects.nonNull(filter) || Objects.nonNull(campo)) {
            List<GenericSpecification.FixedCondition<T>> fixedConditions = new ArrayList<>();

            if (attributes == null) {
                attributes = new ArrayList<>();
            }

            if (Objects.nonNull(campo) && Objects.nonNull(valor)) {
                String[] parts = campo.split("\\.");

                // Adiciona uma condição fixa para o campo dinâmico
                fixedConditions.add((root, query, criteriaBuilder) -> {
                    Path<?> path = root.get(parts[0]);

                    for (int i = 1; i < parts.length; i++) {
                        path = path.get(parts[i]);
                    }

                    return criteriaBuilder.equal(path, valor);
                });
            }

            return ResponseEntity.ok(service.findByAttributes(attributes, filter, PageRequest.of(number, size), entityClass, fixedConditions));
        }

        return ResponseEntity.ok(service.page(PageRequest.of(number, size)));
    }


    @SuppressWarnings("unchecked")
    private T castObjectToT(Object object) {
        try {
            return (T) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to type T", e);
        }
    }

    @SuppressWarnings("unchecked")
    private R castObjectToR(Object object) {
        try {
            return (R) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to type R", e);
        }
    }

}