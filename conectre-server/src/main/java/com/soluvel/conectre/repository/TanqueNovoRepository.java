package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.domain.records.TanqueDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TanqueNovoRepository extends CrudRepository<TanqueNovo, Long> {

    @Query("SELECT new com.soluvel.conectre.domain.records.TanqueDetails(" +
            "t.id as id, " +
            "t.nome as nome," +
            "t.produtor.nome as produtorNome," +
            "t.propriedade.nome as propriedadeNome," +
            "t.tipoTanque as tipoTanque," +
            "ROUND(t.area, 2) as area, " +
            "ROUND(t.potenciaAeracaoTotal, 2) as potenciaAeracaoTotal ) " +
            "FROM TanqueNovo t WHERE t.propriedade.id = :propriedadeId")
    List<TanqueDetails> findAllReduce(@Param("propriedadeId") Long propriedadeId);

}
