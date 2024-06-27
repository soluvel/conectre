package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Plano;
import com.soluvel.conectre.domain.mappers.EmpresaMapper;
import com.soluvel.conectre.domain.records.EmpresaRecords;
import com.soluvel.conectre.domain.records.EmpresaReduceRecords;
import com.soluvel.conectre.service.EmpresaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmpresaController extends CrudController<Empresa, EmpresaRecords, Long> {

    private final EmpresaService service;
    private final EmpresaMapper mapper;

    public EmpresaController(CrudService<Empresa, Long> service, EmpresaService empresaService, EmpresaMapper mapper) {
        super(service, mapper, Empresa.class);
        this.service = empresaService;
        this.mapper = mapper;
    }

    @PostMapping("save/record")
    public ResponseEntity<Empresa> create(@RequestBody EmpresaRecords records) {
        return new ResponseEntity<>(service.save(this.mapper.toEntity(records)), HttpStatus.CREATED);
    }


    @GetMapping("/cidades")
    public ResponseEntity<List<String>> getCidades() {
        return ResponseEntity.ok(service.getCidades());
    }

    @GetMapping("/razao-social")
    public ResponseEntity<List<String>> getRazaoSocial() {
        return ResponseEntity.ok(service.getRazaoSocial());
    }

    @GetMapping("/reduce")
    public ResponseEntity<List<EmpresaReduceRecords>> getEmpresasReduce() {
        return ResponseEntity.ok(service.findAllReduce());
    }

    @GetMapping("/cidade/{number}/{size}")
    public ResponseEntity<Page<Empresa>> pageCidade(@PathVariable int number, @PathVariable int size,
                                                    @RequestParam(value = "filter", required = false) String filter) {

        return ResponseEntity.ok(service.pageWithFilterCidade(filter, PageRequest.of(number, size)));
    }

    @GetMapping("/filter/{number}/{size}")
    public ResponseEntity<Page<Empresa>> pageFilter(@PathVariable int number, @PathVariable int size,
                                                    @RequestParam(value = "planos", required = false) List<String> planos,
                                                    @RequestParam(value = "cidade", required = false) List<String> cidade,
                                                    @RequestParam(value = "empresa", required = false) List<String> empresa) {

        return ResponseEntity.ok(service.empresaFilter(List.of(Plano.START), cidade, empresa, PageRequest.of(number, size)));
    }
}