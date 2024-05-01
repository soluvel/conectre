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

    public void sendEmail(EmailRecord email) {
       var message = new SimpleMailMessage();
       message.setFrom("conectre@conectre.com.br");
       message.setTo(email.to());
       message.setSubject("Recuperação de senha");
       message.setText("corpo de e-mail de recuperar a senha");
       mailSender.send(message);
    }
}
