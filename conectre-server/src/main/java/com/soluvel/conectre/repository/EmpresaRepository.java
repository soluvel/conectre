package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Plano;
import com.soluvel.conectre.domain.records.EmpresaReduceRecords;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmpresaRepository extends CrudRepository<Empresa, Long> {

    @Query("SELECT DISTINCT CONCAT(e.endereco.localidade, ' - ', e.endereco.uf) FROM Empresa e")
    List<String> getCidades();

    @Query("SELECT DISTINCT (e.razaoSocial) FROM Empresa e")
    List<String> getRazaoSocial();

    @Query("SELECT e FROM Empresa e WHERE LOWER(REPLACE(e.endereco.localidade, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:cidade, ' ', ''), '%'))")
    Page<Empresa> findByCidadeContaining(String cidade, Pageable pageable);

    @Query("SELECT e FROM Empresa e WHERE (:planos IS NULL OR e.plano IN :planos) " +
            "AND (:cidades IS NULL OR e.endereco.localidade IN :cidades)" +
            "AND (:empresas IS NULL OR e.razaoSocial IN :empresas)")
    Page<Empresa> empresaFilter(@Param("planos") List<Plano> planos,
                                @Param("cidades") List<String> cidades,
                                @Param("empresas") List<String> empresas,
                                Pageable pageable);

    @Query("SELECT new com.soluvel.conectre.domain.records.EmpresaReduceRecords(e.id, e.razaoSocial) FROM Empresa e")
    List<EmpresaReduceRecords> findAllReduce();
}
