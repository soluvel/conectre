package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmpresaRepository extends CrudRepository<Empresa, Long> {

    @Query("SELECT e FROM Empresa e WHERE LOWER(REPLACE(e.razaoSocial, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:nome, ' ', ''), '%'))")
    Page<Empresa> findByRazaoSocialContaining(String nome, Pageable pageable);

    @Query("SELECT DISTINCT CONCAT(e.endereco.cidade, ' - ', e.endereco.estado) FROM Empresa e")
    List<String> getCidades();

    @Query("SELECT e FROM Empresa e WHERE LOWER(REPLACE(e.endereco.cidade, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:cidade, ' ', ''), '%'))")
    Page<Empresa> findByCidadeContaining(String cidade, Pageable pageable);
}
