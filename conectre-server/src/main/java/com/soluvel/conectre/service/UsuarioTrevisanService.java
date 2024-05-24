package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioTrevisan;
import com.soluvel.conectre.repository.UsuarioTrevisanRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioTrevisanService extends CrudService<UsuarioTrevisan, Long> {

    private final UsuarioTrevisanRepository repository;

    public UsuarioTrevisanService(CrudRepository<UsuarioTrevisan, Long> repository,
                                  UsuarioTrevisanRepository colaboradorRepository) {
        super(repository);
        this.repository = colaboradorRepository;
    }

}
