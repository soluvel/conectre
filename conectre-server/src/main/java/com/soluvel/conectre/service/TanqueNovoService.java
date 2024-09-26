package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.repository.TanqueNovoRepository;
import org.springframework.stereotype.Service;

@Service
public class TanqueNovoService extends CrudService<TanqueNovo, Long> {

    private final TanqueNovoRepository repository;

    public TanqueNovoService(CrudRepository<TanqueNovo, Long> repository,
                             TanqueNovoRepository tanqueNovoRepository) {
        super(repository);
        this.repository = tanqueNovoRepository;
    }


}
