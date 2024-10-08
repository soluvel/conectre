package com.soluvel.conectre.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "checklist", schema = "public")
public class Checklist implements Serializable {

    @Serial
    private static final long serialVersionUID = -8785890862989025848L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sentence;
    private String note;

    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote;

    @Transient
    private Long loteId;

}
