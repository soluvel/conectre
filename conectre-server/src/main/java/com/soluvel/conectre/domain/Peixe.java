package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "peixe", schema = "public")
public class Peixe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "dt_coleta")
    private LocalDate dtColeta;

    @DateTimeFormat(pattern = "HH:mm")
    @JsonFormat(pattern = "HH:mm")
    @Column(name = "hr_coleta")
    private LocalTime hrColeta;

    @Column(name = "qnt_amostra")
    private Integer qntAmostra;

    private Integer volume;

    private Integer mortalidade;

    @Column(name = "peso_medio")
    private BigDecimal pesoMedio;

    private BigDecimal biomassa;

    @Column(name = "ganho_peso")
    private BigDecimal ganhoPeso;

    @Column(name = "kg_racao_ofertada")
    private BigDecimal kgRacaoOfertada;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "medicao_id")
    private Medicao medicao;

}
