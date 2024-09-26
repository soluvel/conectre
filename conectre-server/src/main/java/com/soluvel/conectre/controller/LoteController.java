package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.service.LoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lote")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoteController extends CrudController<Lote, Lote, Long> {

    private final LoteService loteService;

    public LoteController(CrudService<Lote, Long> service,
                          LoteService loteService) {
        super(service, Lote.class);
        this.loteService = loteService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Lote> create(@RequestBody Lote entity) {
        entity.setTanque(TanqueNovo.builder().id(entity.getTanqueId()).build());

        return new ResponseEntity<>(loteService.save(entity), HttpStatus.CREATED);
    }

}
