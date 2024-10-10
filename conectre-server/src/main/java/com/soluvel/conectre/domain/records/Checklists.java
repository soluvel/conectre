package com.soluvel.conectre.domain.records;

import com.soluvel.conectre.domain.Checklist;
import com.soluvel.conectre.domain.Lote;

import java.util.List;

public record Checklists(List<Checklist> checks) {

    public Checklists {
        checks.forEach(check -> check.setLote(Lote.builder().id(check.getLoteId()).build()));
    }
}
