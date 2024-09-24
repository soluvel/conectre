package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.service.TanqueNovoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tanque_novo")
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

}
