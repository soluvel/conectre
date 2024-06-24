package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Notificacao;
import com.soluvel.conectre.domain.Tanque;
import com.soluvel.conectre.domain.Usuario;
import com.soluvel.conectre.service.NotificacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notificacao")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificacaoController extends CrudController<Notificacao, Long> {

    private final NotificacaoService notificacaoService;

    public NotificacaoController(CrudService<Tanque, Long> service,
                                 NotificacaoService notificacaoService) {
        super(notificacaoService, Notificacao.class);
        this.notificacaoService = notificacaoService;
    }

    @GetMapping("/nao-lidos")
    public ResponseEntity<List<Notificacao>> findByDtLeituraNull() {
        return new ResponseEntity<>(notificacaoService.findByDtLeituraNull(), HttpStatus.OK);
    }

    @GetMapping("/lidos")
    public ResponseEntity<List<Notificacao>> findByDtLeituraNotNull() {
        return new ResponseEntity<>(notificacaoService.findByDtHrLeituraNotNull(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Notificacao> create(Notificacao entity) {
        entity.setDtHrEnvio(LocalDateTime.now());
        entity.setRemetente(Usuario.builder().id(entity.getRemetenteId()).build());
        return super.create(entity);
    }
}
