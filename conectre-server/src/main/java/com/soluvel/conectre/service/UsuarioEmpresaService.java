package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.repository.UsuarioEmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioEmpresaService extends CrudService<UsuarioEmpresa, Long> {

    private UsuarioEmpresaRepository repository;

    public UsuarioEmpresaService(CrudRepository<UsuarioEmpresa, Long> repository,
                                 UsuarioEmpresaRepository empresaAdmRepository) {
        super(repository);
        this.repository = empresaAdmRepository;
    }

    public List<UsuarioEmpresa> findByEmpresa(Long empresaId) {
        return repository.findByEmpresaId(empresaId);
    }

}
