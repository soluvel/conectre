package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;

public record UsuarioEmpresaRecords(
        Long id,
        String nome,
        String celular,
        String email,
        String cargo,
        Long empresa) {
}
