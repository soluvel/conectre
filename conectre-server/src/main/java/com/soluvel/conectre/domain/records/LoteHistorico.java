package com.soluvel.conectre.domain.records;

import java.time.LocalDate;

public record LoteHistorico(Long id, String tanqueNome, String propriedadeNome, Integer ca, Double gpd, Integer tlRecebida, LocalDate alojamento, LocalDate despesca, Integer diasCultivo) {
}
