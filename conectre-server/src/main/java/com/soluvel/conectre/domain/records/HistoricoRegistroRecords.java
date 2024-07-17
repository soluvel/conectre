package com.soluvel.conectre.domain.records;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record HistoricoRegistroRecords(
        Long id,
        String tanqueNome,
        String propriedadeNome,
        Integer convAlimenticia,
        BigDecimal gpd,
        BigDecimal temperatura,
        Integer oxigenio,
        BigDecimal racao,
        LocalDate coleta,
        LocalTime hrColeta) {
}
