package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.records.HistoricoRegistroRecords;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicaoRepository extends CrudRepository<Medicao, Long> {

    @Query("SELECT m FROM Medicao m WHERE m.id = (SELECT MAX(r2.id) FROM Medicao r2) and m.tanque.id = :tanqueId")
    Medicao findMedicaoWithMaxId(@Param("tanqueId") Long tanqueId);

    @Query("SELECT new com.soluvel.conectre.domain.records.HistoricoRegistroRecords(m.id, m.tanque.nome, m.tanque.propriedade.nome, 12, " +
            "m.peixe.ganhoPeso, m.ambiente.temperatura, m.ambiente.oxigenio, m.racao.racaoTotal, " +
            "coalesce(m.peixe.dtColeta, m.racao.dtColeta, m.ambiente.dtColeta), coalesce(m.peixe.hrColeta, m.racao.hrColeta, m.ambiente.hrColeta)) " +
            "FROM Medicao m " +
            "where m.tanque.propriedade.produtor.id = :produtorId " +
            "order by coalesce(m.peixe.dtColeta, m.racao.dtColeta, m.ambiente.dtColeta) desc")
    Page<HistoricoRegistroRecords> findHistorico(Long produtorId, Pageable pageable);

}
