package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.repository.PropriedadeRepository;
import org.springframework.stereotype.Service;

@Service
public class PropriedadeService extends CrudService<Propriedade, Long> {

    private final PropriedadeRepository repository;

    public PropriedadeService(CrudRepository<Propriedade, Long> repository,
                              PropriedadeRepository propriedadeRepository) {
        super(repository);
        this.repository = propriedadeRepository;
    }

}
