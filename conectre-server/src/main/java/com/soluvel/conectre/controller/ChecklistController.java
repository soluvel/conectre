package com.soluvel.conectre.controller;

import com.soluvel.conectre.core.CrudController;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Checklist;
import com.soluvel.conectre.domain.records.Checklists;
import com.soluvel.conectre.service.ChecklistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/checklist")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChecklistController extends CrudController<Checklist, Checklist, Long> {

    private final ChecklistService checkListService;

    public ChecklistController(CrudService<Checklist, Long> service,
                               ChecklistService checklistService) {
        super(service, Checklist.class);
        this.checkListService = checklistService;
    }

    @PostMapping("save/record")
    public ResponseEntity<List<Checklist>> create(@RequestBody Checklists entity) {
        return new ResponseEntity<>(checkListService.saveAll(entity.checks()), HttpStatus.CREATED);
    }

}
