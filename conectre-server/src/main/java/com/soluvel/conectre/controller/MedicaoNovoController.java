package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.*;
import com.soluvel.conectre.repository.LoteRepository;
import com.soluvel.conectre.service.MedicaoNovoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Objects;

@RestController
@RequestMapping("/medicao-novo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MedicaoNovoController extends CrudController<MedicaoNovo, MedicaoNovo, Long> {

    private final MedicaoNovoService medicaoNovoService;
    private final LoteRepository loteRepository;

    public MedicaoNovoController(CrudService<MedicaoNovo, Long> service,
                                 MedicaoNovoService loteService,
                                 LoteRepository ltRepository) {
        super(service, MedicaoNovo.class);
        this.medicaoNovoService = loteService;
        this.loteRepository = ltRepository;
    }

    @PostMapping("save/record")
    public ResponseEntity<MedicaoNovo> create(@RequestBody MedicaoNovo entity) {
        loteRepository.findByTanqueIdAndDtFinalizacaoIsNull(entity.getTanqueId())
                .ifPresent(entity::setLote);
        setMedicaoInLists(entity);

        if (Objects.isNull(entity.getDtMedicao())) {
            entity.setDtMedicao(LocalDate.now());
        }
        return new ResponseEntity<>(medicaoNovoService.save(entity), HttpStatus.CREATED);
    }


    private void setMedicaoInLists(MedicaoNovo entity) {
        if (entity.getAguas() != null) {
            for (Agua agua : entity.getAguas()) {
                agua.setMedicao(entity);
            }
        }

        if (entity.getBiometrias() != null) {
            for (Biometria biometria : entity.getBiometrias()) {
                biometria.setMedicao(entity);
            }
        }

        if (entity.getTratos() != null) {
            for (Trato trato : entity.getTratos()) {
                trato.setMedicao(entity);
            }
        }

        if (entity.getEstoques() != null) {
            for (Estoque estoque : entity.getEstoques()) {
                estoque.setMedicao(entity);
            }
        }
    }

}