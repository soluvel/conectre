package com.soluvel.conectre.domain;

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
@Table(name = "lote")
public class Lote implements Serializable {

    @Serial
    private static final long serialVersionUID = 2242367325739244331L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tanque_id")
    private TanqueNovo tanque;

    private String lote;
    private String ciclo;
    private String especie;
    private String origem;

    @Column(name = "data_alojamento")
    private LocalDate dataAlojamento;

    @Column(name = "qtd_reccebida")
    private Integer qtdRecebida;

    private Integer mortalidade;

    @Column(name = "qtd_recebida2")
    private Integer qtdRecebida2;

    @Column(name = "peso_medio")
    private Double pesoMedio;

    @Column(name = "biomassa_total")
    private Double biomassaTotal;

    private Double densidade;

    @Column(name = "biomassa_cv_atual")
    private Double biomassaCVAtual;

    @Column(name = "peso_abate_esperado")
    private Double pesoAbateEsperado;

    @Column(name = "biomassa_estimada_final")
    private Double biomassaEstimadaFinal;

    @Column(name = "dt_finalizacao")
    private LocalDate dtFinalizacao;

    @Column(name = "hr_finalizacao")
    private LocalTime hrFinalizacao;

    @Transient
    private Long tanqueId;
}
