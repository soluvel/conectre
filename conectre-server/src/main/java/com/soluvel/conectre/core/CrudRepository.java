package com.soluvel.conectre.core;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
@NoRepositoryBean
public interface CrudRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {

    Page<T> findAll(Specification<T> spec, Pageable pageable);
}