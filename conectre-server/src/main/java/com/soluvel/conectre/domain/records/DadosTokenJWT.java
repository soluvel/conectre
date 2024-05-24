package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Permissao;

public record DadosTokenJWT(String token, Permissao role, String nome) {
}