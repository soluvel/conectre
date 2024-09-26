package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Medicao;
import com.soluvel.conectre.domain.records.HistoricoRegistroRecords;
import com.soluvel.conectre.service.MedicaoService;
import com.soluvel.conectre.service.TanqueService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

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

        if (medicao.getPeixe().getDtColeta() == null) {
            medicao.setPeixe(null);
        } else {
            medicao.getPeixe().setMedicao(medicao);
        }

        if (medicao.getRacao().getDtColeta() == null) {
            medicao.setRacao(null);
        } else {
            medicao.getRacao().setMedicao(medicao);
        }

        if (medicao.getAmbiente().getDtColeta() == null) {
            medicao.setAmbiente(null);
        } else {
            medicao.getAmbiente().setMedicao(medicao);
        }

        medicao.setDtMedicao(LocalDate.now());
        return new ResponseEntity<>(medicaoService.save(medicao), HttpStatus.CREATED);
    }

    @GetMapping("by-tanque/{tanqueId}")
    public ResponseEntity<Medicao> getByTanqueAndIdMax(@PathVariable("tanqueId") Long tanqueId) {
        return new ResponseEntity<>(medicaoService.findByMaxId(tanqueId), HttpStatus.OK);
    }

    @GetMapping("by-data/{tanqueId}")
    public ResponseEntity<Medicao> getByData(@PathVariable("tanqueId") Long tanqueId, @RequestParam("data") String data) {
        return new ResponseEntity<>(medicaoService.findByData(tanqueId, LocalDate.parse(data)), HttpStatus.OK);
    }

    @GetMapping("anterior-by-data/{tanqueId}")
    public ResponseEntity<Medicao> getAnteriorByData(@PathVariable("tanqueId") Long tanqueId, @RequestParam("data") String data) {
        return new ResponseEntity<>(medicaoService.findAnteriorByData(tanqueId, LocalDate.parse(data)), HttpStatus.OK);
    }


    @GetMapping("historico/{produtorId}/{number}/{size}")
    public ResponseEntity<Page<HistoricoRegistroRecords>> findHistorico(@PathVariable("produtorId") Long produtorId,
                                                                        @PathVariable("number") int number,
                                                                        @PathVariable("size") int size) {
        return new ResponseEntity<>(medicaoService.findHistorico(produtorId, PageRequest.of(number, size)), HttpStatus.OK);
    }
}
