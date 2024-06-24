package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
        Long empresa) {
}
