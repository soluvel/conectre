package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tanque;
import com.soluvel.conectre.service.PropriedadeService;
import com.soluvel.conectre.service.TanqueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tanque")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TanqueController extends CrudController<Tanque, Tanque, Long> {

    private final PropriedadeService propriedadeService;
    private final TanqueService tanqueService;

    public TanqueController(CrudService<Tanque, Long> service,
                            PropriedadeService propriedadeService,
                            TanqueService tanqueService) {
        super(service, Tanque.class);
        this.propriedadeService = propriedadeService;
        this.tanqueService = tanqueService;
    }


    @PostMapping("save/record")
    public ResponseEntity<Tanque> create(@RequestBody Tanque entity) {
        propriedadeService.findById(entity.getPropriedadeId()).ifPresent(entity::setPropriedade);
        return new ResponseEntity<>(tanqueService.save(entity), HttpStatus.CREATED);
    }

    @GetMapping("by-produtor/{id}")
    public ResponseEntity<List<Tanque>> findByProdutor(@PathVariable("id") Long id) {
        return new ResponseEntity<>(tanqueService.findByProdutorId(id), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> create(Object object) {
        Tanque tanque = castObjectToEntity(object);
        propriedadeService.findById(tanque.getPropriedadeId()).ifPresent(tanque::setPropriedade);
        return super.create(object);
    }

    private Tanque castObjectToEntity(Object object) {
        try {
            return (Tanque) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to Tanque", e);
        }
    }

}
