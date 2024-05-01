package com.soluvel.conectre.controller;

import com.soluvel.conectre.domain.records.EmailRecord;
import com.soluvel.conectre.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("email")
public class EmailController {

    private final EmailService emailService;

    @PostMapping()
    public void sendEmail(@RequestBody EmailRecord email) {
        emailService.sendEmail(email);
//        return ResponseEntity.ok("e-mail enviado com sucesso");
    }

}
