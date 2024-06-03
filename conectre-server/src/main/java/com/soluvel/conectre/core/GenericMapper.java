package com.soluvel.conectre.core;

import org.springframework.beans.BeanUtils;

public class GenericMapper {

    public static <D, E> E map(D dto, E entity) {
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }
}
