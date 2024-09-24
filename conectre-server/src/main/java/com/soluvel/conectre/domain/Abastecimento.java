package com.soluvel.conectre.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum Abastecimento {

    BOMBEAMENTO("Bombeamento"),
    GRAVIDADE("Gravidade"),
    CHUVA("Chuva"),
    OUTRO("Outro");

    private String descricao;

}
 