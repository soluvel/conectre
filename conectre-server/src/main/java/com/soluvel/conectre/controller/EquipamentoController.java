package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.service.EquipamentoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipamento")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EquipamentoController extends CrudController<Equipamento, Long> {

    private final EquipamentoService service;

    public EquipamentoController(CrudService<Equipamento, Long> service,
                                 EquipamentoService equipamentoService) {
        super(service);
        this.service = equipamentoService;
    }

}
