package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PropriedadeRecords(
        Long id,
        @NotBlank(message = "nome não pode ser em branco ou nulo")
        String nome,

        @NotNull
        Endereco endereco,

        @NotNull
        Long produtor) {
}
