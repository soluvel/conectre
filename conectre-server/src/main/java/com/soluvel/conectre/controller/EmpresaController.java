package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.service.EmpresaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmpresaController extends CrudController<Empresa, Long> {

    private final EmpresaService service;

    public EmpresaController(CrudService<Empresa, Long> service,
                             EmpresaService empresaService) {
        super(service);
        this.service = empresaService;
    }

    @GetMapping("/page/{number}/{size}")
    public ResponseEntity<Page<Empresa>> page(@PathVariable int number, @PathVariable int size,
                                              @RequestParam(value = "filter", required = false) String filter) {
        if (Objects.nonNull(filter)) {
            return ResponseEntity.ok(service.pageWithFilter(filter, PageRequest.of(number, size)));
        }

        return ResponseEntity.ok(service.page(PageRequest.of(number, size)));
    }

    @GetMapping("/cidades")
    public ResponseEntity<List<String>> getCidades() {
        return ResponseEntity.ok(service.getCidades());
    }

    @GetMapping("/cidade/{number}/{size}")
    public ResponseEntity<Page<Empresa>> pageCidade(@PathVariable int number, @PathVariable int size,
                                                    @RequestParam(value = "filter", required = false) String filter) {

        return ResponseEntity.ok(service.pageWithFilterCidade(filter, PageRequest.of(number, size)));
    }
}