package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.EmpresaGrupo;
import com.soluvel.conectre.service.EmpresaGrupoService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/grupo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmpresaGrupoController extends CrudController<EmpresaGrupo, Long> {

    private final EmpresaGrupoService service;

    public EmpresaGrupoController(CrudService<EmpresaGrupo, Long> service,
                                  EmpresaGrupoService grupoService) {
        super(service, EmpresaGrupo.class);
        this.service = grupoService;
    }

}
