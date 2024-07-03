package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.TokenPassword;
import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.domain.records.PasswordRecord;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UsuarioService usuarioService;
    private final EmailService emailService;
    private final TokenPasswordService tokenPasswordService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioService.findByUsername(username).orElseThrow(() -> new RuntimeException("Login ou senha incorretos"));
    }

    public void requestNewPassword(EmailRecord email) {
        if (usuarioService.existsByUsername(email.username())) {
            String token = GenerateRandomKeyUtils.generateRandomKey(5);
            emailService.sendEmail(email, token);
            tokenPasswordService.save(new TokenPassword(token, email.username(), LocalDateTime.now()));
        } else {
            throw new RuntimeException("usuário não encontrado");
        }
    }

    public void updatePassword(PasswordRecord password) {
        TokenPassword byToken = tokenPasswordService.findByToken(password.token());
        var user = usuarioService.findByUsername(byToken.getUsername());
        user.ifPresent(u -> {
            u.setPassword(password.password());
            usuarioService.save(u);
        });
    }
}
