package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Endereco;
import com.soluvel.conectre.domain.Plano;

public record EmpresaRecords(
        Long id,
        String razaoSocial,
        String cnpjCpf,
        String email,
        Endereco endereco,
        Plano plano,
        Long grupoId) {
}
