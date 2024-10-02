package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.Checklist;
import com.soluvel.conectre.repository.ChecklistRepository;
import org.springframework.stereotype.Service;

@Service
public class ChecklistService extends CrudService<Checklist, Long> {

    private final ChecklistRepository repository;

    public ChecklistService(CrudRepository<Checklist, Long> repository,
                            ChecklistRepository checkRepository) {
        super(repository);
        this.repository = checkRepository;
    }


}
