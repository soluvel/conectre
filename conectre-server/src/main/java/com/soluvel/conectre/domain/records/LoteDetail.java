package com.soluvel.conectre.domain.records;

import java.time.LocalDate;

public record LoteDetail(Long id, LocalDate dataAlojamento, Double pesoAbateEsperado, Integer qtdRecebida, String especie) {
}
