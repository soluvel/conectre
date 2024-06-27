package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.records.EquipamentoResponseRecords;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropriedadeRepository extends CrudRepository<Propriedade, Long> {

    @Query("SELECT COUNT(p) FROM Propriedade p JOIN p.equipamentos e WHERE e.id = :equipamentoId")
    Long countPropriedadesByEquipamentoId(@Param("equipamentoId") Long equipamentoId);

    @Query("SELECT NEW com.soluvel.conectre.domain.records.EquipamentoResponseRecords(e.id, e.nome, e.codigo, (e.quantidade - SIZE(e.propriedades))) FROM Equipamento e " +
            "where e.quantidade > SIZE(e.propriedades)")
    List<EquipamentoResponseRecords> findEquipamentosResponse();


}
