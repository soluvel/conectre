package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.Checklist;
import org.springframework.stereotype.Repository;

@Repository
public interface ChecklistRepository extends CrudRepository<Checklist, Long> {

}
