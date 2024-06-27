package com.soluvel.conectre.repository;

import com.soluvel.conectre.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);
    boolean existsByUsername(String username);

    Optional<Usuario> findByPassword(String password);

}
