package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "biometria")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Biometria implements Serializable {

    @Serial
    private static final long serialVersionUID = -3231195600225922631L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_medicao")
    private LocalDate dtMedicao;

    private LocalTime hora;

    @Column(name = "peixe_amostra")
    private Integer peixePorAmostra;

    private Integer mortalidade;

    @Column(name = "mortalidade_acumulada")
    private Integer mortalidadeAcumulada;

    @Column(name = "qnt_peixe")
    private Integer qntPeixe;

    @Column(name = "peso_medio")
    private Double pesoMedio;

    @Column(name = "biomassa_total")
    private Double biomassaTotal;

    @Column(name = "ganho_peso")
    private Double ganhoPeso;

    @Column(name = "racao_total")
    private Double racaoTotal;

    private Double ca;
    private Double gpd;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicao_id", nullable = false)
    private MedicaoNovo medicao;

}
