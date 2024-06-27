package com.soluvel.conectre.repository;

import com.soluvel.conectre.core.CrudRepository;
import com.soluvel.conectre.domain.TokenPassword;

import java.util.Optional;

public interface TokenPasswordRepository extends CrudRepository<TokenPassword, Long> {

    Optional<TokenPassword> findByToken(String token);
}
