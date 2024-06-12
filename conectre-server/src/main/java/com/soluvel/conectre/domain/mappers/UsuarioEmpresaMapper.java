package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Permissao;
import com.soluvel.conectre.domain.UsuarioEmpresa;
import com.soluvel.conectre.domain.records.UsuarioEmpresaRecords;
import com.soluvel.conectre.service.EmpresaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UsuarioEmpresaMapper {

    private final EmpresaService empresaService;

    public UsuarioEmpresa toEntity(UsuarioEmpresaRecords record) {
        var usuarioEmpresa = new UsuarioEmpresa();
        GenericMapper.map(record, usuarioEmpresa);

        usuarioEmpresa.setUsername(record.nome());
        usuarioEmpresa.setPassword("$2a$12$.0PG.Ju0.vlAFdEh.rLgu.NZFFdD3W9EwOJBjvihyOwd7BfVkDCw2");
        usuarioEmpresa.setPermissao(Permissao.EMPRESA);
        usuarioEmpresa.setAtivo(true);
        usuarioEmpresa.setEmpresa(empresaService.findById(record.empresa()).orElse(null));

        return usuarioEmpresa;
    }
}
