package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.service.UsuarioEmpresaService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/empresa-usuario")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioEmpresaController extends CrudController<UsuarioEmpresa, Long> {

    private final UsuarioEmpresaService service;

    public UsuarioEmpresaController(CrudService<UsuarioEmpresa, Long> service,
                                    UsuarioEmpresaService empresaAdmService) {
        super(service);
        this.service = empresaAdmService;
    }

}
