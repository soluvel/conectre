package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;

public record ProdutorRecords(
        Long id,
        String nome,
        String cpf,
        String celular,
        Endereco endereco,
        Long empresa) {
}
