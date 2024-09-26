package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Lote;
import org.springframework.stereotype.Repository;

@Repository
public interface LoteRepository extends CrudRepository<Lote, Long> {

}
