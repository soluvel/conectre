package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.records.HistoricoRegistroRecords;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface MedicaoRepository extends CrudRepository<Medicao, Long> {

    List<Medicao> findByDtMedicaoBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT m FROM Medicao m WHERE m.id = (SELECT MAX(r2.id) FROM Medicao r2) and m.tanque.id = :tanqueId")
    Medicao findMedicaoWithMaxId(@Param("tanqueId") Long tanqueId);

    @Query("SELECT new com.soluvel.conectre.domain.records.HistoricoRegistroRecords(m.id, m.tanque.nome, m.tanque.propriedade.nome, 12, " +
            "m.peixe.ganhoPeso, m.ambiente.temperatura, m.ambiente.oxigenio, m.racao.racaoTotal, " +
            "coalesce(m.peixe.dtColeta, m.racao.dtColeta, m.ambiente.dtColeta), coalesce(m.peixe.hrColeta, m.racao.hrColeta, m.ambiente.hrColeta)) " +
            "FROM Medicao m " +
            "LEFT JOIN m.peixe p " +
            "LEFT JOIN m.ambiente a " +
            "LEFT JOIN m.racao r " +
            "WHERE m.tanque.propriedade.produtor.id = :produtorId " +
            "ORDER BY coalesce(p.dtColeta, r.dtColeta, a.dtColeta) desc")
    Page<HistoricoRegistroRecords> findHistorico(Long produtorId, Pageable pageable);

    @Query("SELECT m FROM Medicao m LEFT JOIN m.peixe p LEFT JOIN m.ambiente a LEFT JOIN m.racao r WHERE m.tanque.id = :tanqueId AND COALESCE(p.dtColeta, r.dtColeta, a.dtColeta) < :data ORDER BY COALESCE(p.dtColeta, r.dtColeta, a.dtColeta) DESC")
    List<Medicao> findMedicaoAnterior(@Param("tanqueId") Long tanqueId, @Param("data") LocalDate data);

    @Query("SELECT m FROM Medicao m LEFT JOIN m.peixe p LEFT JOIN m.ambiente a LEFT JOIN m.racao r WHERE coalesce(p.dtColeta, r.dtColeta, a.dtColeta) = :data and m.tanque.id = :tanqueId")
    List<Medicao> findMedicaoByData(@Param("tanqueId") Long tanqueId, @Param("data") LocalDate data);
}
