package com.soluvel.conectre.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum TipoAlimentacao {

    MANUAL("Manual"),
    ALIMENTADOR_ARRASTO("Alimentador de Arrasto"),
    ALIMENTADOR_AUTOMATICO("Alimentador Automático"),
    OUTRO("Outro");

    private String descricao;

}
