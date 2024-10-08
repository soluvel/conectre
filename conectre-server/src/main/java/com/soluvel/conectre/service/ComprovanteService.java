package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Comprovante;
import com.soluvel.conectre.repository.ComprovanteRepository;
import org.springframework.stereotype.Service;

@Service
public class ComprovanteService extends CrudService<Comprovante, Long> {

    private final ComprovanteRepository repository;

    public ComprovanteService(CrudRepository<Comprovante, Long> repository,
                              ComprovanteRepository comprovanteRepository) {
        super(repository);
        this.repository = comprovanteRepository;
    }


}
