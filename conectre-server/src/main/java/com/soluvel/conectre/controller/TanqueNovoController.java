package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.domain.records.TanqueDetails;
import com.soluvel.conectre.service.TanqueNovoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tanque-novo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TanqueNovoController extends CrudController<TanqueNovo, TanqueNovo, Long> {

    private final TanqueNovoService tanqueService;

    public TanqueNovoController(CrudService<TanqueNovo, Long> service,
                                TanqueNovoService tanqueService) {
        super(service, TanqueNovo.class);
        this.tanqueService = tanqueService;
    }

    @PostMapping("save/record")
    public ResponseEntity<TanqueNovo> create(@RequestBody TanqueNovo entity) {
        entity.setProdutor(Produtor.builder().id(entity.getProdutorId()).build());
        entity.setPropriedade(Propriedade.builder().id(entity.getPropriedadeId()).build());

        return new ResponseEntity<>(tanqueService.save(entity), HttpStatus.CREATED);
    }

    @GetMapping("/list-by-propriedade/{propriedadeId}")
    public ResponseEntity<List<TanqueDetails>> findAllReduce(@PathVariable("propriedadeId") Long propriedadeId) {
        return ResponseEntity.ok(tanqueService.findAllReduce(propriedadeId));
    }

}
