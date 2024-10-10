package com.soluvel.conectre.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comprovante", schema = "public")
public class Comprovante implements Serializable {

    @Serial
    private static final long serialVersionUID = -1520169049436194751L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private String saida;
    private String entrada;

    @Column(name = "temperatura_agua")
    private String temperaturaAgua;

    private String oxigenio;

    @Column(name = "placa_veiculo")
    private String placaVeiculo;

    @Column(name = "no_caixas")
    private Integer numeroCaixas;

    @Column(name = "peixe_caixa")
    private Integer peixePorCaixa;

    @Column(name = "peso_medio")
    private BigDecimal pesoMedio;

    @Column(name = "peso_total")
    private BigDecimal pesoTotal;

    @Column(name = "numero_lacre")
    private String numeroLacre;

    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote;

    @Transient
    private Long loteId;
}
