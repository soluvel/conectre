package com.soluvel.conectre.domain.records;

public record UsuarioEmpresaRecords(
        Long id,
        String nome,
        String celular,
        String email,
        String cargo,
        Long empresa) {
}
