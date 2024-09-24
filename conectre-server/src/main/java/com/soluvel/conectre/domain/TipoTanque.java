package com.soluvel.conectre.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum TipoTanque {

    ESCAVADO("Escavado"),
    GEOMEMBRANA("Geomembrana"),
    ELEVADO("Elevado"),
    CONCRETO("Concreto"),
    OUTRO("Outro");

    private String descricao;
}
