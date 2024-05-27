package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.service.TecnicoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tecnico")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TecnicoController extends CrudController<Tecnico, Long> {

    private final TecnicoService service;

    public TecnicoController(CrudService<Tecnico, Long> service,
                             TecnicoService tecnicoService) {
        super(service);
        this.service = tecnicoService;
    }

}
