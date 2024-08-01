package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.mappers.TecnicoMapper;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.service.TecnicoService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tecnico")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TecnicoController extends CrudController<Tecnico, TecnicoRecords, Long> {

    private final TecnicoService service;
    private final TecnicoMapper mapper;

    public TecnicoController(CrudService<Tecnico, Long> service, TecnicoService tecnicoService, TecnicoMapper mapper) {
        super(service, mapper, Tecnico.class);
        this.service = tecnicoService;
        this.mapper = mapper;
    }

    @PostMapping("save/record")
    public ResponseEntity<Tecnico> create(@RequestBody TecnicoRecords records) {
        return new ResponseEntity<>(service.save(this.mapper.toEntity(records)), HttpStatus.CREATED);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<TecnicoRecords> updateUser(@PathVariable("id") Long id, @RequestBody TecnicoRecords records) {
        return service.findById(id)
                .map(value -> {
                    String pass = value.getPassword();
                    BeanUtils.copyProperties(mapper.toEntity(records), value);
                    value.setPassword(pass);
                    Tecnico save = service.save(value);
                    return new ResponseEntity<>(mapper.toRecord(save), HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

}
