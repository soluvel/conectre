package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.repository.EquipamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class EquipamentoService extends CrudService<Equipamento, Long> {

    private final EquipamentoRepository repository;

    public EquipamentoService(CrudRepository<Equipamento, Long> repository,
                              EquipamentoRepository equipamentoRepository) {
        super(repository);
        this.repository = equipamentoRepository;
    }

}
