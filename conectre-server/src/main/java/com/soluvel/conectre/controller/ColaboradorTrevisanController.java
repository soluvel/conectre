package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.ColaboradorTrevisan;
import com.soluvel.conectre.service.ColaboradorTrevisanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/colaborador")
public class ColaboradorTrevisanController extends CrudController<ColaboradorTrevisan, Long> {

    private final ColaboradorTrevisanService service;

    public ColaboradorTrevisanController(CrudService<ColaboradorTrevisan, Long> service,
                                         ColaboradorTrevisanService colaboradorService) {
        super(service);
        this.service = colaboradorService;
    }

    @GetMapping("email/{email}")
    public ResponseEntity<Optional<ColaboradorTrevisan>> findByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(service.findByEmail(email));
    }

}
