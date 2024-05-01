package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.domain.records.LoginRecord;
import com.soluvel.conectre.domain.records.PasswordRecord;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class LoginService {

    private final UserService userService;
    private final EmailService emailService;

    public boolean login(LoginRecord login) {
        var user = userService.findByEmail(login.email())
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado para o email: " + login.email()));
        return user.getEmail().equals(login.email()) && user.getPassword().equals(login.password());
    }

    public void requestNewPassword(EmailRecord email) {
        var user = userService.findByEmail(email.email());
        user.ifPresent(u -> {
            String token = GenerateRandomKeyUtils.generateRandomKey(5);
            u.setPassword(token);
            emailService.sendEmail(email, token);

            userService.save(u); //TODO: REFATORAR NA SPRINT 3 (AUTENTICAÇÃO)

        });

    }

    public void updatePassword(PasswordRecord password) {
        var user = userService.findByPassword(password.token());
        user.ifPresent(u -> {
            u.setPassword(password.password());
            userService.save(u);
        });
    }
}
