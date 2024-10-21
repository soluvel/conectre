package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.records.LoteDetail;
import com.soluvel.conectre.domain.records.LoteHistorico;
import com.soluvel.conectre.domain.records.LoteInfos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

    @Query("SELECT l FROM Lote l WHERE l.tanque.id = :tanqueId AND l.dtFinalizacao IS NULL")
    Optional<Lote> findByTanqueIdAndDtFinalizacaoIsNull(@Param("tanqueId") Long tanqueId);

    @Query("SELECT new com.soluvel.conectre.domain.records.LoteInfos("
            + "l.id as id, "
            + "t.nome as nomeTanque, "
            + "l.lote as lote, "
            + "l.ciclo as ciclo, "
            + "t.tipoTanque as tipoTanque, "
            + "t.area as area, "
            + "t.potenciaAeracaoTotal as potenciaAeracaoTotal, "
            + "l.especie as especie, "
            + "l.origem as origem, "
            + "l.dataAlojamento as dataAlojamento, "
            + "l.qtdRecebida as qtdRecebida, "
            + "l.mortalidade as mortalidade, "
            + "l.qtdRecebida2 as qtdRecebida2, "
            + "l.pesoMedio as pesoMedio, "
            + "l.biomassaTotal as biomassaTotal, "
            + "l.densidade as densidade, "
            + "l.biomassaCVAtual as biomassaCVAtual, "
            + "l.pesoAbateEsperado as pesoAbateEsperado, "
            + "l.biomassaEstimadaFinal as biomassaEstimadaFinal, "
            + "c.data as data, "
            + "c.saida as saida, "
            + "c.entrada as entrada, "
            + "c.temperaturaAgua as temperaturaAgua, "
            + "c.oxigenio as oxigenio, "
            + "c.placaVeiculo as placaVeiculo, "
            + "c.numeroCaixas as numeroCaixas, "
            + "c.peixePorCaixa as peixePorCaixa, "
            + "c.pesoMedio as pesoMedioComprovante, "
            + "c.pesoTotal as pesoTotal, "
            + "c.numeroLacre as numeroLacre) "
            + "FROM Lote l "
            + "JOIN l.tanque t "
            + "LEFT JOIN Comprovante c ON c.lote.id = l.id "
            + "WHERE l.id = :loteId")
    LoteInfos loteInfosById(@Param("loteId") Long loteId);


    @Modifying
    @Transactional
    @Query("UPDATE Lote l SET l.dtFinalizacao = :dtFinalizacao, l.hrFinalizacao = :hrFinalizacao WHERE l.id = :loteId")
    void updateLoteFinalizacao(@Param("loteId") Long loteId, @Param("dtFinalizacao") LocalDate dtFinalizacao, @Param("hrFinalizacao") LocalTime hrFinalizacao);
}
