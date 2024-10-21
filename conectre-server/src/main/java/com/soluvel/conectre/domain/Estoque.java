package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "estoque")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Estoque implements Serializable {

    @Serial
    private static final long serialVersionUID = -912417260320639246L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_recebimento")
    private LocalDate dtRecebimento;

    @Column(name = "qtd_recebida")
    private Double qtdRecebida;

    @Column(name = "tipo_racao")
    private String tipoRacao;

    @Column(name = "nrm_nf")
    private String nrmNf;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicao_id", nullable = false)
    private MedicaoNovo medicao;

}
