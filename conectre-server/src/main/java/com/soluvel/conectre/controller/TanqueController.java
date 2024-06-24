package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Tanque;
import com.soluvel.conectre.service.PropriedadeService;
import com.soluvel.conectre.service.TanqueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tanque")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TanqueController extends CrudController<Tanque, Long> {

    private final TanqueService tanqueService;
    private final PropriedadeService propriedadeService;

    public TanqueController(CrudService<Tanque, Long> service,
                            TanqueService tanqueService,
                            PropriedadeService propriedadeService) {
        super(service, Tanque.class);
        this.tanqueService = tanqueService;
        this.propriedadeService = propriedadeService;
    }

    @Override
    public ResponseEntity<Tanque> create(Tanque tanque) {
        propriedadeService.findById(tanque.getPropriedadeId()).ifPresent(tanque::setPropriedade);
        return super.create(tanque);
    }
}
