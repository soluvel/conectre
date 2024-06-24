package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tanque;
import com.soluvel.conectre.repository.TanqueRepository;
import org.springframework.stereotype.Service;

@Service
public class TanqueService extends CrudService<Tanque, Long> {

    private final TanqueRepository repository;

    public TanqueService(CrudRepository<Tanque, Long> repository,
                         TanqueRepository tanqueRepository) {
        super(repository);
        this.repository = tanqueRepository;
    }

}
