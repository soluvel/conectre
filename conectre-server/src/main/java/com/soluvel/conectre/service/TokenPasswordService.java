package com.soluvel.conectre.service;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.core.CrudService;
import com.soluvel.conectre.domain.TokenPassword;
import com.soluvel.conectre.repository.TokenPasswordRepository;
import org.springframework.stereotype.Service;

@Service
public class TokenPasswordService extends CrudService<TokenPassword, Long> {

    private final TokenPasswordRepository repository;

    public TokenPasswordService(CrudRepository<TokenPassword, Long> repository,
                                TokenPasswordRepository tokenPasswordRepository) {
        super(repository);
        this.repository = tokenPasswordRepository;
    }

    public TokenPassword findByToken(String token) {
        return repository.findByToken(token).orElseThrow();
    }

}
