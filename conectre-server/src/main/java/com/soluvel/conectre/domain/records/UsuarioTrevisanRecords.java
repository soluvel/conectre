package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Permissao;

public record UsuarioTrevisanRecords(String nome, String password, Permissao permissao, String cargo, String email) {

}
