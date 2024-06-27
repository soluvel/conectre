package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.mappers.ProdutorMapper;
import com.soluvel.conectre.domain.records.ProdutorRecords;
import com.soluvel.conectre.service.ProdutorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/produtor")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProdutorController extends CrudController<Produtor, ProdutorRecords, Long> {

    private final ProdutorMapper mapper;
    private final ProdutorService produtorServicevice;

    public ProdutorController(CrudService<Produtor, Long> service, ProdutorMapper mapper, ProdutorService produtorServicevice) {
        super(service, mapper, Produtor.class);
        this.mapper = mapper;
        this.produtorServicevice = produtorServicevice;
    }

    @PostMapping("save/record")
    public ResponseEntity<Produtor> create(@RequestBody ProdutorRecords records) {
        return new ResponseEntity<>(produtorServicevice.save(this.mapper.toEntity(records)), HttpStatus.CREATED);
    }

}
