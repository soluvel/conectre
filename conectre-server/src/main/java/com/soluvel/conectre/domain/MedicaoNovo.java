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
    @JoinColumn(name = "tanque_id")
    private TanqueNovo tanque;

    @Column(name = "dt_medicao")
    private LocalDate dtMedicao;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY)
    private List<Agua> aguas;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY)
    private List<Biometria> biometrias;

    @OneToMany(mappedBy = "medicao", fetch = FetchType.LAZY)
    private List<Trato> tratos;

    @OneToOne(mappedBy = "medicao", cascade = CascadeType.ALL)
    private Estoque estoque;

}
