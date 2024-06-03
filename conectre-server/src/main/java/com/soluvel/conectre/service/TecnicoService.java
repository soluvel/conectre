package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.repository.TecnicoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TecnicoService extends CrudService<Tecnico, Long> {

    private final TecnicoRepository repository;

    public TecnicoService(CrudRepository<Tecnico, Long> repository,
                          TecnicoRepository tecnicoRepository) {
        super(repository);
        this.repository = tecnicoRepository;
    }

    public Page<Tecnico> page(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
