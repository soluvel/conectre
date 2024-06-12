package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.domain.mappers.UsuarioEmpresaMapper;
import com.soluvel.conectre.domain.records.UsuarioEmpresaRecords;
import com.soluvel.conectre.service.UsuarioEmpresaService;
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
@RequestMapping("/empresa-administrador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioEmpresaController extends CrudController<UsuarioEmpresa, Long> {

    private  UsuarioEmpresaService service;
    private final UsuarioEmpresaMapper mapper;

    public UsuarioEmpresaController(CrudService<UsuarioEmpresa, Long> service, UsuarioEmpresaService empresaAdmService, UsuarioEmpresaMapper mapper) {
        super(service);
        this.service = empresaAdmService;
        this.mapper = mapper;
    }

    @PostMapping("save/record")
    public ResponseEntity<UsuarioEmpresa> create(@RequestBody UsuarioEmpresaRecords records) {
        return super.create(mapper.toEntity(records));
    }


    @GetMapping("adm-empresa/{empresaId}")
    public ResponseEntity<List<UsuarioEmpresa>> findByEmpresa(@PathVariable("empresaId") Long empresaId) {
        return ResponseEntity.ok(service.findByEmpresa(empresaId));
    }
}
