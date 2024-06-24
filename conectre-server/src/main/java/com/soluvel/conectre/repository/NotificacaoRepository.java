package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Notificacao;

import java.util.List;
import java.util.Optional;

public interface NotificacaoRepository extends CrudRepository<Notificacao, Long> {
    List<Notificacao> findByDtHrLeituraNull();

    List<Notificacao> findByDtHrLeituraNotNull();

}
