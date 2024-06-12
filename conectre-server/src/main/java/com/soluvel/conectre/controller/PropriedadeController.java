package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.service.PropriedadeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/propriedade")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropriedadeController extends CrudController<Propriedade, Long> {

    private final PropriedadeService service;

    public PropriedadeController(CrudService<Propriedade, Long> service,
                                 PropriedadeService propriedadeService) {
        super(service);
        this.service = propriedadeService;
    }

}
