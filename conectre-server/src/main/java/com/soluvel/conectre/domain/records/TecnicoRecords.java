package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;

public record TecnicoRecords(
        Long id,
        String nome,
        String cpf,
        String celular,
        String cargo,
        Endereco endereco,
        Long empresa) {
}
