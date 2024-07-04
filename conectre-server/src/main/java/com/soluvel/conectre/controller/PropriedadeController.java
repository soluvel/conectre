package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.core.GenericMapper;
import com.soluvel.conectre.domain.Equipamento;
import com.soluvel.conectre.domain.Produtor;
import com.soluvel.conectre.domain.Propriedade;
import com.soluvel.conectre.domain.records.EquipamentoResponseRecords;
import com.soluvel.conectre.domain.records.PropriedadeRecords;
import com.soluvel.conectre.service.EquipamentoService;
import com.soluvel.conectre.service.PropriedadeService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/propriedade")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PropriedadeController extends CrudController<Propriedade, Propriedade, Long> {

    private final PropriedadeService service;
    private final EquipamentoService equipamentoService;

    public PropriedadeController(CrudService<Propriedade, Long> service,
                                 PropriedadeService propriedadeService,
                                 EquipamentoService equipamentoService) {
        super(service, Propriedade.class);
        this.service = propriedadeService;
        this.equipamentoService = equipamentoService;
    }

    @PostMapping("save/record")
    public ResponseEntity<Propriedade> create(@RequestBody PropriedadeRecords records) {
        var propriedade = GenericMapper.map(records, new Propriedade());
        propriedade.setProdutor(Produtor.builder().id(records.produtor()).build());
        return new ResponseEntity<>(service.save(propriedade), HttpStatus.CREATED);
    }

//    @Override
//    public ResponseEntity<?> create(Object object) {
//        PropriedadeRecords propriedadeRecords = castObjectToRecord(object);
//        var propriedade = GenericMapper.map(propriedadeRecords, new Propriedade());
//        propriedade.setProdutor(Produtor.builder().id(propriedadeRecords.id()).build());
//        return super.create(propriedade);
//    }

    @PostMapping("/{id}/equipamentos")
    public Propriedade adicionarEquipamentos(@PathVariable Long id, @RequestBody List<Long> equipamentos) {
        Propriedade propriedade = service.findById(id).orElseThrow();
        equipamentos.forEach(e -> {
            Equipamento equipamento = equipamentoService.findById(e).orElseThrow();
            Long count = service.countEquipamentosById(equipamento.getId());

            if (count < equipamento.getQuantidade()) {
                propriedade.getEquipamentos().add(equipamento);
            } else {
                throw new RuntimeException();
            }
        });

        return service.save(propriedade);
    }

    @GetMapping("/equipamentos")
    public ResponseEntity<List<EquipamentoResponseRecords>> equipamentosDisponiveis() {
        return new ResponseEntity<>(service.listEquipamentoResponse(), HttpStatus.OK);
    }

    @GetMapping("/by-produtor/{produtor}")
    public ResponseEntity<Page<Propriedade>> findAllByProdutorId(@PathVariable("produtor") Long produtor) {
        return new ResponseEntity<>(service.findAllByProdutorId(produtor), HttpStatus.OK);
    }

    private PropriedadeRecords castObjectToRecord(Object object) {
        try {
            return (PropriedadeRecords) object;
        } catch (ClassCastException e) {
            throw new IllegalArgumentException("Failed to cast object to PropriedadeRecords", e);
        }
    }

}
