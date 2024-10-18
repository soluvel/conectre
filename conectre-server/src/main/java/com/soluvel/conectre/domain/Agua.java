package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "agua")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Agua implements Serializable {

    @Serial
    private static final long serialVersionUID = 730957410120360708L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dt_medicao")
    private LocalDate dtMedicao;

    private LocalDateTime hora;

    private Integer ph;
    private Integer amonia;
    private Integer nitrito;
    private Integer alcalinidade;
    private Integer transparencia;
    private Double oxigenio;
    private Double temperatura;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicao_id", nullable = false)
    private MedicaoNovo medicao;
}
