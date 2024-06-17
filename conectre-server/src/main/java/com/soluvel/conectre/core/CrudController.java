package com.soluvel.conectre.core;

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
import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
public abstract class CrudController<T, ID extends Serializable> {

    private CrudService<T, ID> service;

    private final Class<T> entityClass;

    @GetMapping
    public ResponseEntity<List<T>> findAll() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return new ResponseEntity<>(service.count(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> getById(@PathVariable("id") ID id) {
        return service.findById(id)
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/save")
    public ResponseEntity<T> create(@RequestBody T entity) {
        return new ResponseEntity<>(service.save(entity), HttpStatus.CREATED);
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
                                              @RequestParam(value = "attributes", required = false) List<String> attributes) {
        if (Objects.nonNull(filter)) {
            return ResponseEntity.ok(service.findByAttributes(attributes, filter, PageRequest.of(number, size), entityClass));
        }

        return ResponseEntity.ok(service.page(PageRequest.of(number, size)));
    }

}