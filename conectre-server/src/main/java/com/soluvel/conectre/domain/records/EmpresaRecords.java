package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;
import com.soluvel.conectre.domain.Plano;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmpresaRecords(
        Long id,

        @NotBlank(message = "razaoSocial não pode ser em branco ou nulo")
        String razaoSocial,

        @NotBlank(message = "cnpjCpf não pode ser em branco ou nulo")
        String cnpjCpf,

        @NotBlank(message = "email não pode ser em branco ou nulo")
        String email,

        @NotNull
        Endereco endereco,

        @NotNull
        Plano plano,
        Long grupoId) {
}
