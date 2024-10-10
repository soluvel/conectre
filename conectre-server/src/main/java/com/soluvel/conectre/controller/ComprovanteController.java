package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Comprovante;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.service.ComprovanteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comprovante")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ComprovanteController extends CrudController<Comprovante, Comprovante, Long> {

    private final ComprovanteService checkListService;

    public ComprovanteController(CrudService<Comprovante, Long> service,
                                 ComprovanteService checklistService) {
        super(service, Comprovante.class);
        this.checkListService = checklistService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Comprovante> create(@RequestBody Comprovante entity) {
        entity.setLote(Lote.builder().id(entity.getLoteId()).build());
        return new ResponseEntity<>(checkListService.save(entity), HttpStatus.CREATED);
    }

}
