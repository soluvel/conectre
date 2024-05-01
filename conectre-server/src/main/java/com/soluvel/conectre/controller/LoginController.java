package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.domain.records.LoginRecord;
import com.soluvel.conectre.domain.records.PasswordRecord;
import com.soluvel.conectre.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("login")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController {

    private final LoginService service;

    @PostMapping()
    public ResponseEntity<Boolean> login(@RequestBody LoginRecord login) {
        return ResponseEntity.ok(service.login(login));
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



