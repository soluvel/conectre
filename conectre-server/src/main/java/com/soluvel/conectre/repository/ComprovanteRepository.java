package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Comprovante;
import org.springframework.stereotype.Repository;

@Repository
public interface ComprovanteRepository extends CrudRepository<Comprovante, Long> {

}
