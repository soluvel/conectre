package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.UsuarioTrevisan;
import com.soluvel.conectre.domain.records.RegisterRecord;
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
        super(service);
        this.service = usuarioTrevisanService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody @Valid RegisterRecord data) {
        if (this.usuarioService.findByUsername(data.username()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        var newUser = new UsuarioTrevisan(data.nome(), data.username(), encryptedPassword, data.permissao(), data.cargo());

        this.service.save(newUser);
        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }

}
