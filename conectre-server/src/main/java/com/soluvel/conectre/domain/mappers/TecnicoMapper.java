package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.service.EmpresaService;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static com.soluvel.conectre.utils.StringFormat.removeSpecialCharacters;

@Component
@AllArgsConstructor
public class TecnicoMapper {

    private final EmpresaService empresaService;

    public Tecnico toEntity(TecnicoRecords record) {
        Tecnico tecnico = new Tecnico();
        GenericMapper.map(record, tecnico);

        tecnico.setCelular(removeSpecialCharacters(record.celular()));
        tecnico.setCpf(removeSpecialCharacters(record.cpf()));
        tecnico.setUsername(record.email());

        if (Objects.isNull(tecnico.getId())) {
            tecnico.setPassword(GenerateRandomKeyUtils.generateRandomKey(6));
        }

        tecnico.setPermissao(Permissao.TECNICO);
        tecnico.setAtivo(true);
        tecnico.setEmpresa(empresaService.findById(record.empresa()).orElse(null));

        return tecnico;
    }
}
