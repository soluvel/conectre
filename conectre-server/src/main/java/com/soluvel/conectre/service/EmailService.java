package com.soluvel.conectre.service;

import com.soluvel.conectre.domain.records.EmailRecord;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(EmailRecord email, String token) {
       var message = new SimpleMailMessage();
       message.setFrom("conectre@conectre.com.br");
       message.setTo(email.email());
       message.setSubject("Recuperação de senha");
       message.setText(String.format("Na Sprint de autenticação, será adicionaddo a funcionalidade " +
               "do link que expira para recuperar a senha. Por enquanto, " +
               "a senha pode ser recuperada acessando: http://localhost:4200/redefinir-senha/%s ", token));
       mailSender.send(message);
    }
}
