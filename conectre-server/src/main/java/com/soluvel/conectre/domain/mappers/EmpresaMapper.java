package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.core.Mapper;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Plano;
import com.soluvel.conectre.domain.records.EmpresaRecords;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class EmpresaMapper implements Mapper<Empresa, EmpresaRecords> {

    @Override
    public EmpresaRecords toRecord(Empresa entity) {
        Long grupoId = Objects.nonNull(entity.getGrupo()) ? entity.getGrupo().getId() : null;
        return new EmpresaRecords(entity.getId(), entity.getRazaoSocial(), entity.getCnpjCpf(), entity.getEmail(),
                entity.getEndereco(), entity.getPlano(), grupoId);
    }

    public Empresa toEntity(EmpresaRecords record) {
        Empresa empresa = new Empresa();
        GenericMapper.map(record, empresa);

        empresa.setPlano(Plano.START);

        if (Objects.isNull(record.grupoId())) {
            empresa.setGrupo(null);
        }

        return empresa;
    }
}
