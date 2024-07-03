package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioTrevisan;
import com.soluvel.conectre.domain.mappers.UsuarioTrevisanMapper;
import com.soluvel.conectre.domain.records.UsuarioTrevisanRecords;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trevisan")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioTrevisanController extends CrudController<UsuarioTrevisan, UsuarioTrevisanRecords, Long> {

    public UsuarioTrevisanController(CrudService<UsuarioTrevisan, Long> service, UsuarioTrevisanMapper mapper) {
        super(service, mapper, UsuarioTrevisan.class);
    }

}
