package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicao_novo")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MedicaoNovo implements Serializable {

    @Serial
    private static final long serialVersionUID = 730957410120360708L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote;

    @Column(name = "dt_medicao")
    private LocalDate dtMedicao;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Agua> aguas;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Biometria> biometrias;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Trato> tratos;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Estoque> estoques;

    @Transient
    private Long tanqueId;



}
