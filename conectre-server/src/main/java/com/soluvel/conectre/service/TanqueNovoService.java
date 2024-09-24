package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.TanqueNovo;
import com.soluvel.conectre.repository.TanqueNovoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TanqueNovoService extends CrudService<TanqueNovo, Long> {

    private final TanqueNovoRepository repository;


}
