package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Lote;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.domain.records.LoteDetail;
import com.soluvel.conectre.domain.records.LoteFinalizacao;
import com.soluvel.conectre.domain.records.LoteHistorico;
import com.soluvel.conectre.domain.records.LoteInfos;
import com.soluvel.conectre.service.LoteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lote")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoteController extends CrudController<Lote, Lote, Long> {

    private final LoteService loteService;

    public LoteController(CrudService<Lote, Long> service,
                          LoteService loteService) {
        super(service, Lote.class);
        this.loteService = loteService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Lote> create(@RequestBody Lote entity) {
        entity.setTanque(TanqueNovo.builder().id(entity.getTanqueId()).build());

        return new ResponseEntity<>(loteService.save(entity), HttpStatus.CREATED);
    }

    @GetMapping("find-by-propriedade-id/{propriedadeId}/{page}/{size}")
    public ResponseEntity<Page<LoteHistorico>> findByPropriedadeId(@PathVariable("propriedadeId") Long propriedadeId, @PathVariable("page") int page, @PathVariable("size") int size) {
        return new ResponseEntity<>(loteService.findByPropriedadeId(propriedadeId, PageRequest.of(page, size)), HttpStatus.OK);
    }

    @GetMapping("find-detail/{id}")
    public ResponseEntity<LoteDetail> findDetailById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(loteService.findDetailById(id), HttpStatus.OK);
    }

    @GetMapping("find-infos/{id}")
    public ResponseEntity<LoteInfos> findInfosById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(loteService.findInfosById(id), HttpStatus.OK);
    }

    @PatchMapping("finalizacao")
    public ResponseEntity<Void> patchLoteFinalizacao(@RequestBody LoteFinalizacao LoteFinalizacao) {
        loteService.updateLoteFinalizacao(LoteFinalizacao.loteId(), LoteFinalizacao.dtFinalizacao(), LoteFinalizacao.hrFinalizacao());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}