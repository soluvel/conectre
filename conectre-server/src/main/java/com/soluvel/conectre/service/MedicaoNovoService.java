package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.MedicaoNovo;
import com.soluvel.conectre.repository.MedicaoNovoRepository;
import org.springframework.stereotype.Service;

@Service
public class MedicaoNovoService extends CrudService<MedicaoNovo, Long> {

    private final MedicaoNovoRepository repository;

    public MedicaoNovoService(CrudRepository<MedicaoNovo, Long> repository,
                              MedicaoNovoRepository loteRepository) {
        super(repository);
        this.repository = loteRepository;
    }

}
