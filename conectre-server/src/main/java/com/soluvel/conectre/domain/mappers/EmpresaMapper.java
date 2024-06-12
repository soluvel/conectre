package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.EmpresaGrupo;
import com.soluvel.conectre.domain.records.EmpresaRecords;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class EmpresaMapper {

    public Empresa toEntity(EmpresaRecords record) {
        Empresa empresa = new Empresa();
        GenericMapper.map(record, empresa);

        empresa.getEndereco().setEstado("PR");

        if (Objects.isNull(record.grupoId())) {
            empresa.setGrupo(null);
        }

        return empresa;
    }
}
