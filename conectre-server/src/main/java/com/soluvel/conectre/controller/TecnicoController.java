package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.mappers.TecnicoMapper;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.service.TecnicoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tecnico")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TecnicoController extends CrudController<Tecnico, Long> {

    private final TecnicoService service;
    private final TecnicoMapper mapper;

    public TecnicoController(CrudService<Tecnico, Long> service, TecnicoService tecnicoService, TecnicoMapper mapper) {
        super(service);
        this.service = tecnicoService;
        this.mapper = mapper;
    }

    @PostMapping("save/record")
    public ResponseEntity<Tecnico> create(@RequestBody TecnicoRecords records) {
        return super.create(mapper.toEntity(records));
    }

    @GetMapping("/page/{number}/{size}")
    public ResponseEntity<Page<Tecnico>> page(@PathVariable int number, @PathVariable int size) {
        return ResponseEntity.ok(service.page(PageRequest.of(number, size)));
    }
}
