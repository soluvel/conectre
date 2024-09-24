package com.soluvel.conectre.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tanque_novo")
public class TanqueNovo implements Serializable {

    @Serial
    private static final long serialVersionUID = -6847967512841134654L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produtor_id")
    private Produtor produtor;

    @ManyToOne
    @JoinColumn(name = "propriedade_id")
    private Propriedade propriedade;

    @Column(name = "no_aeradores")
    private Integer noAeradores;

    private Double area;
    private Double volume;

    @Column(name = "max_abastecimento")
    private Double maxAbastecimento;

    @Column(name = "profundidade_media")
    private Double profundidadeMedia;

    @Column(name = "potencia_aeracao_total")
    private Double potenciaAeracaoTotal;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_tanque")
    private TipoTanque tipoTanque;

    @Enumerated(EnumType.STRING)
    @Column(name = "rede_eletrica")
    private RedeEletrica redeEletrica;

    @Enumerated(EnumType.STRING)
    private Abastecimento abastecimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_alimentacao")
    private TipoAlimentacao tipoAlimentacao;

    @Transient
    private Long produtorId;

    @Transient
    private Long propriedadeId;
}
