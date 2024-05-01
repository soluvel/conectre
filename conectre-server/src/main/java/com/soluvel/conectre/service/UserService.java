package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.User;
import com.soluvel.conectre.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;

    public User save(User user) {
        return repository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Optional<User> findByPassword(String password) {
        return repository.findByPassword(password);
    }
}
