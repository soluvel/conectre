package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.service.EquipamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/equipamento")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EquipamentoController extends CrudController<Equipamento, Equipamento, Long> {

    private final EquipamentoService equipService;

    public EquipamentoController(CrudService<Equipamento, Long> service, EquipamentoService equipService) {
        super(service, Equipamento.class);
        this.equipService = equipService;
    }

    @PostMapping("save/entity")
    public ResponseEntity<Equipamento> create(@RequestBody Equipamento entity) {
        return new ResponseEntity<>(equipService.save(entity), HttpStatus.CREATED);
    }

}
