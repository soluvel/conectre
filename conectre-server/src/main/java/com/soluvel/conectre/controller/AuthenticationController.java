package com.soluvel.conectre.controller;

import com.soluvel.conectre.config.TokenService;
import com.soluvel.conectre.domain.Usuario;
import com.soluvel.conectre.domain.records.AuthenticationRecord;
import com.soluvel.conectre.domain.records.DadosTokenJWT;
import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.domain.records.PasswordRecord;
import com.soluvel.conectre.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthenticationController {

    private final AuthenticationService service;
    private final AuthenticationManager manager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<DadosTokenJWT> login(@RequestBody @Valid AuthenticationRecord data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());
        var auth = this.manager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new DadosTokenJWT(token, ((Usuario) auth.getPrincipal()).getPermissao(), ((Usuario) auth.getPrincipal()).getNome(), ((Usuario) auth.getPrincipal()).getId()));
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<Void> requestNewPassword(@RequestBody EmailRecord email) {
        service.requestNewPassword(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/redefinir-senha/update")
    public ResponseEntity<Void> updatePassword(@RequestBody PasswordRecord passwordRecord) {
        service.updatePassword(passwordRecord);
        return ResponseEntity.noContent().build();
    }
}




