package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Ambiente;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.Peixe;
import com.soluvel.conectre.domain.Racao;
import com.soluvel.conectre.domain.records.HistoricoRegistroRecords;
import com.soluvel.conectre.repository.MedicaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

@Service
public class MedicaoService extends CrudService<Medicao, Long> {

    private final MedicaoRepository medicaoRepository;

    public MedicaoService(CrudRepository<Medicao, Long> repository,
                          MedicaoRepository tanqueRepository) {
        super(repository);
        this.medicaoRepository = tanqueRepository;
    }

    public Medicao findByMaxId(Long tanqueId) {
        return medicaoRepository.findMedicaoWithMaxId(tanqueId);
    }

    public Medicao findByData(Long tanqueId, LocalDate data) {
        List<Medicao> medicaoByData = medicaoRepository.findMedicaoByData(tanqueId, data);
        if (!medicaoByData.isEmpty()) {
            return medicaoByData.get(0);
        }
        return null;
    }

    public Medicao findAnteriorByData(Long tanqueId, LocalDate data) {
        List<Medicao> medicaoAnterior = medicaoRepository.findMedicaoAnterior(tanqueId, data);
        if (!medicaoAnterior.isEmpty()) {
            return medicaoAnterior.get(0);
        }
        return null;
    }

    public Page<HistoricoRegistroRecords> findHistorico(Long produtorId, Pageable pageable) {
        return medicaoRepository.findHistorico(produtorId, pageable);
    }

    public Medicao somarValores(LocalDate startDate, LocalDate endDate) {
        List<Medicao> medicoes = medicaoRepository.findByDtMedicaoBetween(startDate, endDate);

        Medicao somaMedicao = new Medicao();
        somaMedicao.setPeixe(getPeixe(medicoes));
        somaMedicao.setRacao(getRacao(medicoes));
        somaMedicao.setAmbiente(getAmbiente(medicoes));

        return somaMedicao;
    }

    private Ambiente getAmbiente(List<Medicao> medicoes) {
        Ambiente a = new Ambiente();
        a.setPh(sumAtributosIntegerAmbiente(medicoes, Ambiente::getPh));
        a.setAmonia(sumAtributosIntegerAmbiente(medicoes, Ambiente::getAmonia));
        a.setNitrito(sumAtributosIntegerAmbiente(medicoes, Ambiente::getNitrito));
        a.setTransparenciaAgua(sumAtributosIntegerAmbiente(medicoes, Ambiente::getTransparenciaAgua));
        a.setOxigenio(sumAtributosIntegerAmbiente(medicoes, Ambiente::getOxigenio));
        a.setAlcalinidade(sumAtributosBigDecimalAmbiente(medicoes, Ambiente::getAlcalinidade));
        a.setTemperatura(sumAtributosBigDecimalAmbiente(medicoes, Ambiente::getTemperatura));
        return a;
    }


    private Peixe getPeixe(List<Medicao> medicoes) {
        Peixe p = new Peixe();
        p.setQntAmostra(sumAtributosIntegerPeixe(medicoes, Peixe::getQntAmostra));
        p.setVolume(sumAtributosIntegerPeixe(medicoes, Peixe::getVolume));
        p.setMortalidade(sumAtributosIntegerPeixe(medicoes, Peixe::getMortalidade));
        p.setPesoMedio(sumAtributosBigDecimalPeixe(medicoes, Peixe::getPesoMedio));
        p.setBiomassa(sumAtributosBigDecimalPeixe(medicoes, Peixe::getBiomassa));
        p.setGanhoPeso(sumAtributosBigDecimalPeixe(medicoes, Peixe::getGanhoPeso));
        p.setKgRacaoOfertada(sumAtributosBigDecimalPeixe(medicoes, Peixe::getKgRacaoOfertada));
        return p;
    }

    private Racao getRacao(List<Medicao> medicoes) {
        Racao r = new Racao();
        r.setTemperatura(sumAtributosBigDecimalRacao(medicoes, Racao::getTemperatura));
        r.setOxigenio(sumAtributosIntegerRacao(medicoes, Racao::getOxigenio));
        r.setRacaoTrato(sumAtributosBigDecimalRacao(medicoes, Racao::getRacaoTrato));
        r.setRacaoTotal(sumAtributosBigDecimalRacao(medicoes, Racao::getRacaoTotal));
        return r;
    }

    public Integer sumAtributosIntegerPeixe(List<Medicao> medicoes, Function<Peixe, Integer> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getPeixe)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();
    }

    public Integer sumAtributosIntegerRacao(List<Medicao> medicoes, Function<Racao, Integer> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getRacao)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();
    }

    public BigDecimal sumAtributosBigDecimalPeixe(List<Medicao> medicoes, Function<Peixe, BigDecimal> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getPeixe)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal sumAtributosBigDecimalRacao(List<Medicao> medicoes, Function<Racao, BigDecimal> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getRacao)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Integer sumAtributosIntegerAmbiente(List<Medicao> medicoes, Function<Ambiente, Integer> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getAmbiente)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .mapToInt(Integer::intValue)
                .sum();
    }

    public BigDecimal sumAtributosBigDecimalAmbiente(List<Medicao> medicoes, Function<Ambiente, BigDecimal> atributoGetter) {
        return medicoes.stream()
                .map(Medicao::getAmbiente)
                .filter(Objects::nonNull)
                .map(atributoGetter)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


}
