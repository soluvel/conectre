package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Notificacao;
import com.soluvel.conectre.repository.UsuarioRepository;
import com.soluvel.conectre.service.NotificacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notificacao")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NotificacaoController extends CrudController<Notificacao, Notificacao, Long> {

    private final NotificacaoService notificacaoService;
    private final UsuarioRepository usuarioRepository;

    public NotificacaoController(CrudService<Notificacao, Long> service,
                                 NotificacaoService notificacaoService,
                                 UsuarioRepository usuarioRepository) {
        super(service, Notificacao.class);
        this.notificacaoService = notificacaoService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/nao-lidos")
    public ResponseEntity<List<Notificacao>> findByDtLeituraNull() {
        return new ResponseEntity<>(notificacaoService.findByDtLeituraNull(), HttpStatus.OK);
    }

    @GetMapping("/lidos")
    public ResponseEntity<List<Notificacao>> findByDtLeituraNotNull() {
        return new ResponseEntity<>(notificacaoService.findByDtHrLeituraNotNull(), HttpStatus.OK);
    }

    @PostMapping("save/entity")
    public ResponseEntity<Notificacao> create(@RequestBody Notificacao entity) {
        entity.setDtHrEnvio(LocalDateTime.now());
        entity.setRemetente(usuarioRepository.findById(entity.getRemetenteId()).orElseThrow());
        return new ResponseEntity<>(notificacaoService.save(entity), HttpStatus.CREATED);
    }

//    @Override
//    public ResponseEntity<?> create(Object object) {
//        Notificacao entity = castObjectToEntity(object);
//        entity.setDtHrEnvio(LocalDateTime.now());
//        entity.setRemetente(usuarioRepository.findById(entity.getRemetenteId()).orElseThrow());
//        return super.create(object);
//    }

    private Notificacao castObjectToEntity(Object object) {
        try {
            return (Notificacao) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to Notificacao", e);
        }
    }
}
