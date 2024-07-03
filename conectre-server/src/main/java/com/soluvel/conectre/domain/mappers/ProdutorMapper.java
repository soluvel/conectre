package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.records.ProdutorRecords;
import com.soluvel.conectre.service.EmpresaService;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static com.soluvel.conectre.utils.StringFormat.removeSpecialCharacters;

@Component
@AllArgsConstructor
public class ProdutorMapper {

    private final EmpresaService empresaService;

    public Produtor toEntity(ProdutorRecords record) {
        Produtor produtor = new Produtor();
        GenericMapper.map(record, produtor);

        produtor.setCelular(removeSpecialCharacters(record.celular()));
        produtor.setCpf(removeSpecialCharacters(record.cpf()));
        produtor.setUsername(record.email());

        if (Objects.isNull(produtor.getId())) {
            produtor.setPassword(GenerateRandomKeyUtils.generateRandomKey(6));
        }
        produtor.setPermissao(Permissao.PRODUTOR);
        produtor.setAtivo(true);
        produtor.setEmpresa(empresaService.findById(record.empresa().id()).orElse(null));

        return produtor;
    }
}
