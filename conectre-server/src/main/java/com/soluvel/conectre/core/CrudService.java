package com.soluvel.conectre.core;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public abstract class CrudService<T, ID extends Serializable> {

    private CrudRepository<T, ID> repository;

    public T save(T entity) {
        return repository.save(entity);
    }

    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    public List<T> findAll() {
        return repository.findAll();
    }

    public Long count() {
        return repository.count();
    }

    public Page<T> findByAttributes(List<String> attributes, String value, Pageable pageable, Class<T> clazz) {
        Specification<T> spec = new GenericSpecification<>(attributes, value, clazz).buildSpecification();
        return repository.findAll(spec, pageable);
    }

    public Page<T> page(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public void deleteById(ID id) {
        repository.deleteById(id);
    }

}