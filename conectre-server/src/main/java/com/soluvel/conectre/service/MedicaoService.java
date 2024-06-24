package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.repository.MedicaoRepository;
import org.springframework.stereotype.Service;

@Service
public class MedicaoService extends CrudService<Medicao, Long> {

    private final MedicaoRepository medicaoRepository;

    public MedicaoService(CrudRepository<Medicao, Long> repository,
                          MedicaoRepository tanqueRepository) {
        super(repository);
        this.medicaoRepository = tanqueRepository;
    }

}
