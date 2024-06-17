package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.Tecnico;
import com.soluvel.conectre.domain.records.TecnicoRecords;
import com.soluvel.conectre.service.EmpresaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import static com.soluvel.conectre.utils.StringFormat.removeSpecialCharacters;

@Component
@AllArgsConstructor
public class TecnicoMapper {

    private final EmpresaService empresaService;

    public Tecnico toEntity(TecnicoRecords record) {
        Tecnico tecnico = new Tecnico();
        GenericMapper.map(record, tecnico);

        tecnico.setCelular(removeSpecialCharacters(record.celular()));
        tecnico.setCpf("07700000");
        tecnico.setUsername(record.nome());
        tecnico.setPassword("$2a$12$.0PG.Ju0.vlAFdEh.rLgu.NZFFdD3W9EwOJBjvihyOwd7BfVkDCw2");
        tecnico.setPermissao(Permissao.TECNICO);
        tecnico.setAtivo(true);
        tecnico.setEmpresa(empresaService.findById(record.empresa()).orElse(null));

        return tecnico;
    }
}
