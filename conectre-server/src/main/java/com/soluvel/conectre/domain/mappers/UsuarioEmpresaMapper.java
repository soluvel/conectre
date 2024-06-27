package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.core.Mapper;
import com.soluvel.conectre.domain.Empresa;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.domain.records.UsuarioEmpresaRecords;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@AllArgsConstructor
public class UsuarioEmpresaMapper implements Mapper<UsuarioEmpresa, UsuarioEmpresaRecords> {

    @Override
    public UsuarioEmpresaRecords toRecord(UsuarioEmpresa entity) {
        return null;
    }

    public UsuarioEmpresa toEntity(UsuarioEmpresaRecords record) {
        var usuarioEmpresa = new UsuarioEmpresa();
        GenericMapper.map(record, usuarioEmpresa);

        usuarioEmpresa.setUsername(record.email());

        if (Objects.isNull(record.id())) {
            usuarioEmpresa.setPassword(GenerateRandomKeyUtils.generateRandomKey(6));
        }
        usuarioEmpresa.setPermissao(Permissao.EMPRESA);
        usuarioEmpresa.setAtivo(true);
        usuarioEmpresa.setEmpresa(Empresa.builder().id(record.empresa()).build());

        return usuarioEmpresa;
    }
}
