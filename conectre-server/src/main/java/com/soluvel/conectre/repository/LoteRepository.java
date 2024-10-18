package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.records.LoteDetail;
import com.soluvel.conectre.domain.records.LoteHistorico;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoteRepository extends CrudRepository<Lote, Long> {

    @Query("SELECT l FROM Lote l WHERE l.tanque.propriedade.id = :propriedadeId")
    List<Lote> findByPropriedadeId(@Param("propriedadeId") Long propriedadeId);

    @Query("SELECT new com.soluvel.conectre.domain.records.LoteHistorico(" +
            "l.id as id, t.nome as tanqueNome, p.nome as propriedadeNome, 12 as ca, 40.00 as gpd, l.qtdRecebida as tlRecebida, l.dataAlojamento as alojamento, l.dataAlojamento as despesca, 300 as diasCultivo) " +
            "FROM Lote l " +
            "JOIN l.tanque t " +
            "JOIN t.propriedade p " +
            "WHERE t.propriedade.id = :propriedadeId")
    Page<LoteHistorico> findLoteHistoricoByPropriedadeId(@Param("propriedadeId") Long propriedadeId, Pageable pageable);

    @Query("SELECT new com.soluvel.conectre.domain.records.LoteDetail(" +
            "l.id as id, l.dataAlojamento as dataAlojamento, l.pesoAbateEsperado as pesoAbateEsperado, " +
            "(l.qtdRecebida + l.qtdRecebida2) as qtdRecebida, l.especie as especie) " +
            "FROM Lote l " +
            "WHERE l.id = :loteId")
    LoteDetail loteDetailById(@Param("loteId") Long loteId);
}
