package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.Endereco;
import com.soluvel.conectre.service.ViaCepService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("via-cep")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ViaCepController {

    private final ViaCepService viaCepService;

    @GetMapping("/{cep}")
    public ResponseEntity<Endereco> getCidades(@PathVariable("cep") String cep) throws IOException, InterruptedException {
        return ResponseEntity.ok(viaCepService.getEndereco(cep));
    }





}
