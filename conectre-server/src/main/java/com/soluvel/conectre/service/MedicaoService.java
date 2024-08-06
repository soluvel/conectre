package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.records.HistoricoRegistroRecords;
import com.soluvel.conectre.repository.MedicaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MedicaoService extends CrudService<Medicao, Long> {

    private final MedicaoRepository medicaoRepository;

    public MedicaoService(CrudRepository<Medicao, Long> repository,
                          MedicaoRepository tanqueRepository) {
        super(repository);
        this.medicaoRepository = tanqueRepository;
    }

    public Medicao findByMaxId(Long tanqueId) {
        return medicaoRepository.findMedicaoWithMaxId(tanqueId);
    }

    public Medicao findByData(Long tanqueId, LocalDate data) {
        List<Medicao> medicaoByData = medicaoRepository.findMedicaoByData(tanqueId, data);
        if (!medicaoByData.isEmpty()) {
            return medicaoByData.get(0);
        }
        return null;
    }

    public Medicao findAnteriorByData(Long tanqueId, LocalDate data) {
        List<Medicao> medicaoAnterior = medicaoRepository.findMedicaoAnterior(tanqueId, data);
        if (!medicaoAnterior.isEmpty()) {
            return medicaoAnterior.get(0);
        }
        return null;
    }

    public Page<HistoricoRegistroRecords> findHistorico(Long produtorId, Pageable pageable) {
        return medicaoRepository.findHistorico(produtorId, pageable);
    }

}
