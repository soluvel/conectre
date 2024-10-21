package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.TipoTanque;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LoteInfos(Long id,
                        String nomeTanque,
                        String lote,
                        String ciclo,
                        TipoTanque tipoTanque,
                        Double area,
                        Double potenciaAeracaoTotal,
                        String especie,
                        String origem,
                        LocalDate dataAlojamento,
                        Integer qtdRecebida,
                        Integer mortalidade,
                        Integer qtdRecebida2,
                        Double pesoMedio,
                        Double biomassaTotal,
                        Double densidade,
                        Double biomassaCVAtual,
                        Double pesoAbateEsperado,
                        Double biomassaEstimadaFinal,
                        LocalDate data,
                        String saida,
                        String entrada,
                        String temperaturaAgua,
                        String oxigenio,
                        String placaVeiculo,
                        Integer numeroCaixas,
                        Integer peixePorCaixa,
                        BigDecimal pesoMedioComprovante,
                        BigDecimal pesoTotal,
                        String numeroLacre
) {
}