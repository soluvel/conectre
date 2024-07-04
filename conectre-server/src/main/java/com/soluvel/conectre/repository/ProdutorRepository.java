package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.records.ProdutorReduceRecords;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutorRepository extends CrudRepository<Produtor, Long> {

    @Query("SELECT new com.soluvel.conectre.domain.records.ProdutorReduceRecords(e.id, e.nome) FROM Produtor e")
    List<ProdutorReduceRecords> findAllReduce();
}