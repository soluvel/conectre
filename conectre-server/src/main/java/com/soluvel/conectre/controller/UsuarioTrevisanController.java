package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioTrevisan;
import com.soluvel.conectre.domain.records.UsuarioTrevisanRecords;
import com.soluvel.conectre.service.UsuarioService;
import com.soluvel.conectre.service.UsuarioTrevisanService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trevisan")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioTrevisanController extends CrudController<UsuarioTrevisan, Long> {

    private final UsuarioService usuarioService;
    private final UsuarioTrevisanService service;

    public UsuarioTrevisanController(CrudService<UsuarioTrevisan, Long> service,
                                     UsuarioTrevisanService usuarioTrevisanService,
                                     UsuarioService usuarioService) {
        super(service, UsuarioTrevisan.class);
        this.service = usuarioTrevisanService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody @Valid UsuarioTrevisanRecords data) {
        if (this.usuarioService.findByUsername(data.email()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        var newUser = new UsuarioTrevisan(data.nome(), data.email(), encryptedPassword, data.permissao(), data.cargo(), data.email());

        this.service.save(newUser);
        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }

}
