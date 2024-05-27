package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.repository.TecnicoRepository;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService extends CrudService<Tecnico, Long> {

    private final TecnicoRepository repository;

    public TecnicoService(CrudRepository<Tecnico, Long> repository,
                          TecnicoRepository tecnicoRepository) {
        super(repository);
        this.repository = tecnicoRepository;
    }

}
