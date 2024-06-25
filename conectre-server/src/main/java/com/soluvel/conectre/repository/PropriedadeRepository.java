package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.domain.Propriedade;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropriedadeRepository extends CrudRepository<Propriedade, Long> {

    @Query("SELECT COUNT(p) FROM Propriedade p JOIN p.equipamentos e WHERE e.id = :equipamentoId")
    Long countPropriedadesByEquipamentoId(@Param("equipamentoId") Long equipamentoId);

    @Query("SELECT e FROM Equipamento e WHERE e.quantidade > (SELECT COUNT(pr) FROM Propriedade pr JOIN pr.equipamentos eq WHERE eq.id = e.id)")
    List<Equipamento> findEquipamentosWithQuantidadeLessThanCount();
}
