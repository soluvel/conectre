package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Medicao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicaoRepository extends CrudRepository<Medicao, Long> {

    @Query("SELECT m FROM Medicao m WHERE m.id = (SELECT MAX(r2.id) FROM Medicao r2) and m.tanque.id = :tanqueId")
    Medicao findMedicaoWithMaxId(@Param("tanqueId") Long tanqueId);
}
