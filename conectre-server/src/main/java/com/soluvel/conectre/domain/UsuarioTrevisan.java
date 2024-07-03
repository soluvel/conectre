package com.soluvel.conectre.domain;

import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.records.UsuarioTrevisanRecords;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

import static com.soluvel.conectre.utils.StringFormat.removeSpecialCharacters;

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
    private String celular;

    public static UsuarioTrevisan toEntity(UsuarioTrevisanRecords record) {
        UsuarioTrevisan usuarioTrevisan = new UsuarioTrevisan();
        GenericMapper.map(record, usuarioTrevisan);

        usuarioTrevisan.setCelular(removeSpecialCharacters(record.celular()));
        usuarioTrevisan.setUsername(record.email());

        if (Objects.isNull(usuarioTrevisan.getId())) {
            usuarioTrevisan.setPassword(GenerateRandomKeyUtils.generateRandomKey(6));
        }

        usuarioTrevisan.setPermissao(Permissao.ADM_TREVISAN);
        usuarioTrevisan.setAtivo(true);
        return usuarioTrevisan;
    }
}
