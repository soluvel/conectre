package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.records.PropriedadeRecords;
import com.soluvel.conectre.service.ProdutorService;
import com.soluvel.conectre.service.PropriedadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/propriedade")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropriedadeController extends CrudController<Propriedade, Long> {

    private final PropriedadeService service;
    private final ProdutorService produtorService;

    public PropriedadeController(CrudService<Propriedade, Long> service,
                                 PropriedadeService propriedadeService,
                                 ProdutorService produtorService) {
        super(service, Propriedade.class);
        this.service = propriedadeService;
        this.produtorService = produtorService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Propriedade> create(@RequestBody PropriedadeRecords records) {
        var propriedade = GenericMapper.map(records, new Propriedade());
        produtorService.findById(records.produtor()).ifPresent(propriedade::setProdutor);
        return super.create(propriedade);
    }

}
