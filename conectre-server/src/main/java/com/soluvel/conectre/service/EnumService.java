package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.EnumValue;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

@Service
public class EnumService {

    public static <E extends Enum<E>> List<EnumValue> getEnumValuesAndDescriptions(String enumClassName) {
        try {
            Class<E> enumClass = (Class<E>) Class.forName("com.soluvel.conectre.domain." + enumClassName);
            List<EnumValue> valuesAndDescriptions = new ArrayList<>();
            Method getDescricaoMethod = enumClass.getMethod("getDescricao");
            for (E enumConstant : enumClass.getEnumConstants()) {
                String value = enumConstant.name();
                String descricao = (String) getDescricaoMethod.invoke(enumConstant);
                valuesAndDescriptions.add(new EnumValue(value, descricao));
            }
            return valuesAndDescriptions;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
