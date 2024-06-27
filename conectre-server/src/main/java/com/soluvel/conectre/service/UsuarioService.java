package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.Usuario;
import com.soluvel.conectre.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;

    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    public Optional<Usuario> findByUsername(String email) {
        return repository.findByUsername(email);
    }

    public boolean existsByUsername(String email) {
        return repository.existsByUsername(email);
    }

    public Optional<Usuario> findByPassword(String password) {
        return repository.findByPassword(password);
    }

}
