package com.soluvel.conectre.core;

public interface Mapper<T, R> {
    R toRecord(T entity);
    T toEntity(R record);
}
