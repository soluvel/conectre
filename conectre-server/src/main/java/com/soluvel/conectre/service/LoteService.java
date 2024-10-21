package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.records.LoteDetail;
import com.soluvel.conectre.domain.records.LoteHistorico;
import com.soluvel.conectre.domain.records.LoteInfos;
import com.soluvel.conectre.repository.LoteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

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

    public LoteInfos findInfosById(Long id) {
        return repository.loteInfosById(id);
    }

    public void updateLoteFinalizacao(Long id, LocalDate dtFinalizacao, LocalTime hrFinalizacao) {
        repository.updateLoteFinalizacao(id, dtFinalizacao, hrFinalizacao);
    }
}
