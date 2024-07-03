package com.soluvel.conectre.domain.mappers;


import com.soluvel.conectre.core.Mapper;
import com.soluvel.conectre.domain.UsuarioTrevisan;
import com.soluvel.conectre.domain.records.UsuarioTrevisanRecords;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UsuarioTrevisanMapper implements Mapper<UsuarioTrevisan, UsuarioTrevisanRecords> {


    @Override
    public UsuarioTrevisanRecords toRecord(UsuarioTrevisan entity) {
        return null;
    }

    @Override
    public UsuarioTrevisan toEntity(UsuarioTrevisanRecords record) {
        return null;
    }
}
