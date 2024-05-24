package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.repository.UsuarioEmpresaRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioEmpresaService extends CrudService<UsuarioEmpresa, Long> {

    private final UsuarioEmpresaRepository repository;

    public UsuarioEmpresaService(CrudRepository<UsuarioEmpresa, Long> repository,
                                 UsuarioEmpresaRepository empresaAdmRepository) {
        super(repository);
        this.repository = empresaAdmRepository;
    }

}
