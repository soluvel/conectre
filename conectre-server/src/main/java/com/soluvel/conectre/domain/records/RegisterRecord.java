package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Permissao;

public record RegisterRecord(String nome, String username, String password, Permissao permissao, String cargo) {

}
