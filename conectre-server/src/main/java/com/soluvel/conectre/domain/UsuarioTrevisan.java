package com.soluvel.conectre.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
@Table(name = "usuario_trevisan", schema = "public")
public class UsuarioTrevisan extends Usuario implements Serializable {

    private String cargo;
    private String email;

    public UsuarioTrevisan(String nome, String username, String password, Permissao permissao, String cargo, String email) {
        super(nome, username, password, permissao);
        this.cargo = cargo;
        this.email = email;
    }
}
