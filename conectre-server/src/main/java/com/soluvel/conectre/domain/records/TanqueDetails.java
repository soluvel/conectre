package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.TipoTanque;

public record TanqueDetails(Long id, String nome,
                            String produtorNome,
                            String propriedadeNome,
                            TipoTanque tipoTanque,
                            Double area,
                            Double potenciaAeracaoTotal) {
}
