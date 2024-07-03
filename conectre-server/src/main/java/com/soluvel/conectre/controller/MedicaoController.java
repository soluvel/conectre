package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.service.MedicaoService;
import com.soluvel.conectre.service.TanqueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medicao")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MedicaoController extends CrudController<Medicao, Medicao, Long> {

    private final TanqueService tanqueService;
    private final MedicaoService medicaoService;

    public MedicaoController(CrudService<Medicao, Long> service,
                             TanqueService tanqueService,
                             MedicaoService medicaoService) {
        super(service, Medicao.class);
        this.tanqueService = tanqueService;
        this.medicaoService = medicaoService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Medicao> create(@RequestBody Medicao medicao) {
        tanqueService.findById((medicao.getTanqueId())).ifPresent(medicao::setTanque);

        if (medicao.getPeixe() != null) {
            medicao.getPeixe().setMedicao(medicao);
        }

        if (medicao.getAmbiente() != null) {
            medicao.getAmbiente().setMedicao(medicao);
        }

        if (medicao.getRacao().getDtColeta() == null) {
            medicao.setRacao(null);
        }
        return new ResponseEntity<>(medicaoService.save(medicao), HttpStatus.CREATED);
    }

    private Medicao castObjectToMedicao(Object object) {
        try {
            return (Medicao) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to Medicao", e);
        }
    }
}
