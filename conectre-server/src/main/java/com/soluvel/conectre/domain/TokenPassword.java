package com.soluvel.conectre.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "token_password")
public class TokenPassword implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;
    private String username;

    @Column(name = "dt_solicitacao")
    private LocalDateTime dtSolicitacao;

    public TokenPassword(String token, String username, LocalDateTime dtSolicitacao) {
        this.token = token;
        this.username = username;
        this.dtSolicitacao = dtSolicitacao;
    }
}
