package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.records.ProdutorReduceRecords;
import com.soluvel.conectre.repository.ProdutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutorService extends CrudService<Produtor, Long> {

    private final ProdutorRepository repository;

    public ProdutorService(CrudRepository<Produtor, Long> repository,
                           ProdutorRepository produtorRepository) {
        super(repository);
        this.repository = produtorRepository;
    }

    public List<ProdutorReduceRecords> findAllReduce() {
        return repository.findAllReduce();
    }
}
