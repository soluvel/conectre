package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.records.EquipamentoResponseRecords;
import com.soluvel.conectre.repository.PropriedadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropriedadeService extends CrudService<Propriedade, Long> {

    private final PropriedadeRepository repository;

    public PropriedadeService(CrudRepository<Propriedade, Long> repository,
                              PropriedadeRepository propriedadeRepository) {
        super(repository);
        this.repository = propriedadeRepository;
    }

    public Long countEquipamentosById(Long equipamentoId) {
        return repository.countPropriedadesByEquipamentoId(equipamentoId);
    }

    public List<EquipamentoResponseRecords> listEquipamentoResponse() {
        return repository.findEquipamentosResponse();
    }

}
