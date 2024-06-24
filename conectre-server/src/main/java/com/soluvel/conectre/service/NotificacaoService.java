package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Notificacao;
import com.soluvel.conectre.repository.NotificacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacaoService extends CrudService<Notificacao, Long> {

    private final NotificacaoRepository repository;

    public NotificacaoService(CrudRepository<Notificacao, Long> repository,
                              NotificacaoRepository notificacaoRepository) {
        super(repository);
        this.repository = notificacaoRepository;
    }

    public List<Notificacao> findByDtLeituraNull() {
        return repository.findByDtHrLeituraNull();
    }

    public List<Notificacao> findByDtHrLeituraNotNull() {
        return repository.findByDtHrLeituraNotNull();
    }

}
