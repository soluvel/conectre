package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Tanque;

import java.util.List;

public interface TanqueRepository extends CrudRepository<Tanque, Long> {

    List<Tanque> findByPropriedadeProdutorId(Long id);
}
