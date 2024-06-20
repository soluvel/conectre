package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.mappers.ProdutorMapper;
import com.soluvel.conectre.domain.mappers.TecnicoMapper;
import com.soluvel.conectre.domain.records.ProdutorRecords;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.service.ProdutorService;
import com.soluvel.conectre.service.TecnicoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/produtor")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProdutorController extends CrudController<Produtor, Long> {

    private final ProdutorService service;
    private final ProdutorMapper mapper;

    public ProdutorController(CrudService<Produtor, Long> service, ProdutorService produtorService, ProdutorMapper mapper) {
        super(service, Produtor.class);
        this.service = produtorService;
        this.mapper = mapper;
    }

    @PostMapping("save/record")
    public ResponseEntity<Produtor> create(@RequestBody ProdutorRecords records) {
        return super.create(mapper.toEntity(records));
    }

}
