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
@Table(name = "trato")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Trato implements Serializable {

    @Serial
    private static final long serialVersionUID = -9103876166730069524L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_medicao")
    private LocalDate dtMedicao;

    private LocalTime hora;

    private Double temperatura;
    private Double oxigenio;

    @Column(name = "racao_ofertada")
    private Double racaoOfertada;

    @Column(name = "racao_despejada")
    private Double racaoTotalDespejada;

    @Column(name = "racao_restante_silo")
    private Double racaoRestanteSilo;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicao_id", nullable = false)
    private MedicaoNovo medicao;

}
