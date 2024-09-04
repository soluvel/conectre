package com.soluvel.conectre.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "medicao", schema = "public")
public class Medicao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tanque_id")
    private Tanque tanque;

    @Transient
    private Long tanqueId;

    @OneToOne(mappedBy = "medicao", cascade = CascadeType.ALL)
    private Peixe peixe;

    @OneToOne(mappedBy = "medicao", cascade = CascadeType.ALL)
    private Ambiente ambiente;

    @OneToOne(mappedBy = "medicao", cascade = CascadeType.ALL)
    private Racao racao;

    private LocalDate dtMedicao;

    public Long getTanqueId() {
        return Objects.nonNull(tanque) ? tanque.getId() : this.tanqueId;
    }
}
