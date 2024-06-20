package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.records.ProdutorRecords;
import com.soluvel.conectre.service.EmpresaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import static com.soluvel.conectre.utils.StringFormat.removeSpecialCharacters;

@Component
@AllArgsConstructor
public class ProdutorMapper {

    private final EmpresaService empresaService;

    public Produtor toEntity(ProdutorRecords record) {
        Produtor produtor = new Produtor();
        GenericMapper.map(record, produtor);

        produtor.setCelular(removeSpecialCharacters(record.celular()));
        produtor.setCpf("07700000");
        produtor.setUsername(record.nome());
        produtor.setPassword("$2a$12$.0PG.Ju0.vlAFdEh.rLgu.NZFFdD3W9EwOJBjvihyOwd7BfVkDCw2");
        produtor.setPermissao(Permissao.PRODUTOR);
        produtor.setAtivo(true);
        produtor.setEmpresa(empresaService.findById(record.empresa()).orElse(null));

        return produtor;
    }
}
