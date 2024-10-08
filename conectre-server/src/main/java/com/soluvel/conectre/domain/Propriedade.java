package com.soluvel.conectre.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "propriedade", schema = "public")
public class Propriedade implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    @Embedded
    private Endereco endereco;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("propriedades")
    @JoinColumn(name = "produtor_id", nullable = false)
    private Produtor produtor;

    @ManyToMany
    @JoinTable(
            name = "propriedade_equipamento",
            joinColumns = @JoinColumn(name = "propriedade_id"),
            inverseJoinColumns = @JoinColumn(name = "equipamento_id")
    )
    private List<Equipamento> equipamentos = new ArrayList<>();

    @OneToMany(mappedBy = "propriedade", fetch = FetchType.LAZY)
    private List<Tanque> tanques;

}
