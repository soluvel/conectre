package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.ColaboradorTrevisan;
import com.soluvel.conectre.repository.ColaboradorTrevisanRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ColaboradorTrevisanService extends CrudService<ColaboradorTrevisan, Long> {

    private final ColaboradorTrevisanRepository repository;

    public ColaboradorTrevisanService(CrudRepository<ColaboradorTrevisan, Long> repository,
                                      ColaboradorTrevisanRepository colaboradorRepository) {
        super(repository);
        this.repository = colaboradorRepository;
    }

    public ColaboradorTrevisan save(ColaboradorTrevisan colaborador) {
        return repository.save(colaborador);
    }

    public Optional<ColaboradorTrevisan> findByEmail(String email) {
        return repository.findByEmail(email);
    }
}
