package com.soluvel.conectre.domain.records;

import jakarta.validation.constraints.NotBlank;

public record ProdutorRecords(
        Long id,
        @NotBlank(message = "nome não pode ser em branco ou nulo")
        String nome,

        @NotBlank(message = "cpf não pode ser em branco ou nulo")
        String cpf,

        @NotBlank(message = "celular não pode ser em branco ou nulo")
        String celular,

        @NotBlank(message = "email não pode ser em branco ou nulo")
        String email,

        String avatar,
        Long empresa) {
}
