package com.soluvel.conectre.domain;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Endereco {

    @NotBlank(message = "cep não pode ser em branco ou nulo")
    private String cep;

    @NotBlank(message = "cep não pode ser em branco ou nulo")
    private String logradouro;

    @NotBlank(message = "numero não pode ser em branco ou nulo")
    private String numero;

    private String complemento;

    @NotBlank(message = "bairro não pode ser em branco ou nulo")
    private String bairro;

    @NotBlank(message = "localidade não pode ser em branco ou nulo")
    private String localidade;

    @NotBlank(message = "uf não pode ser em branco ou nulo")
    private String uf;
}
