package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.UsuarioEmpresa;

import java.util.List;

public interface UsuarioEmpresaRepository extends CrudRepository<UsuarioEmpresa, Long> {

    List<UsuarioEmpresa> findByEmpresaId(Long empresaId);
}
