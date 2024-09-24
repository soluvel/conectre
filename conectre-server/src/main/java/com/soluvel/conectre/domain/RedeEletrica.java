package com.soluvel.conectre.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum RedeEletrica {

    MONOFASICA("Monofásica"),
    TRIFASICA_220V("Trifásica 220V"),
    TRIFAISCA_380V("Trifásica 380V"),
    TRIFASICA_220V_380V("Trifásica 220V/380V"),
    OUTRO("Outro");

    private String descricao;

}
 