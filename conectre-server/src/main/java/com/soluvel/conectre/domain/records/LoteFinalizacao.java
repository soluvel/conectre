package com.soluvel.conectre.domain.records;

import java.time.LocalDate;
import java.time.LocalTime;

public record LoteFinalizacao(Long loteId, LocalDate dtFinalizacao, LocalTime hrFinalizacao) {
}