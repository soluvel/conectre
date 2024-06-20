package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.repository.ProdutorRepository;
import com.soluvel.conectre.repository.TecnicoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProdutorService extends CrudService<Produtor, Long> {

    private final ProdutorRepository repository;

    public ProdutorService(CrudRepository<Produtor, Long> repository,
                           ProdutorRepository produtorRepository) {
        super(repository);
        this.repository = produtorRepository;
    }
}
