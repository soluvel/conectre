package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.repository.LoteRepository;
import org.springframework.stereotype.Service;

@Service
public class LoteService extends CrudService<Lote, Long> {

    private final LoteRepository repository;

    public LoteService(CrudRepository<Lote, Long> repository,
                       LoteRepository loteRepository) {
        super(repository);
        this.repository = loteRepository;
    }


}
