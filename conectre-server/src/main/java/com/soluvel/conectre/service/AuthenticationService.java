package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.domain.records.PasswordRecord;
import com.soluvel.conectre.utils.GenerateRandomKeyUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UsuarioService usuarioService;
    private final EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioService.findByUsername(username).orElseThrow(() -> new RuntimeException("Login ou senha incorretos"));
    }

    public void requestNewPassword(EmailRecord email) {
        var user = usuarioService.findByUsername(email.username());
        user.ifPresent(u -> {
            String token = GenerateRandomKeyUtils.generateRandomKey(5);
            u.setPassword(token); //TODO: se o usuário desistir de redefinir a senha?
            emailService.sendEmail(email, token);

            usuarioService.save(u);

        });

    }

    public void updatePassword(PasswordRecord password) {
        var user = usuarioService.findByPassword(password.token());
        user.ifPresent(u -> {
            u.setPassword(password.password());
            usuarioService.save(u);
        });
    }
}
