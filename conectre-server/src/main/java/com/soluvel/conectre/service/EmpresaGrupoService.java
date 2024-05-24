package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.EmpresaGrupo;
import com.soluvel.conectre.repository.EmpresaGrupoRepository;
import org.springframework.stereotype.Service;

@Service
public class EmpresaGrupoService extends CrudService<EmpresaGrupo, Long> {

    private final EmpresaGrupoRepository repository;

    public EmpresaGrupoService(CrudRepository<EmpresaGrupo, Long> repository,
                               EmpresaGrupoRepository grupoRepository) {
        super(repository);
        this.repository = grupoRepository;
    }

}
