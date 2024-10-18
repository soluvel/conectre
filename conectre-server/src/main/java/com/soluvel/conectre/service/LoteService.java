package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.records.LoteDetail;
import com.soluvel.conectre.domain.records.LoteHistorico;
import com.soluvel.conectre.repository.LoteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LoteService extends CrudService<Lote, Long> {

    private final LoteRepository repository;

    public LoteService(CrudRepository<Lote, Long> repository,
                       LoteRepository loteRepository) {
        super(repository);
        this.repository = loteRepository;
    }

    public Page<LoteHistorico> findByPropriedadeId(Long id, Pageable pageable) {
        return repository.findLoteHistoricoByPropriedadeId(id, pageable);
    }

    public LoteDetail findDetailById(Long id) {
        return repository.loteDetailById(id);
    }
}
