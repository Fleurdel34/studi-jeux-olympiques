package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.model.Validation;
import com.studijeuxolympiques.service.NotificationService;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Create class NotificationServiceImpl
 * Execute business processing
 * Use the framework javamail and JavaMailSender class to simulate sending email
 */

@Service
public class NotificationServiceImpl implements NotificationService {

    JavaMailSender javaMailSender;

    public NotificationServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    @Override
    public void sendMessage(Validation validation) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("no-reply@jo.com");
        mailMessage.setTo(validation.getUser().getMail());
        mailMessage.setSubject("Code d'activation");
        String textMail = String.format(
                "Bonjour %s, Votre code d'activation est %s. Cordialement Les Jeux Olympiques Paris 2024",
                validation.getUser().getFirstname(),
                validation.getCode());

        mailMessage.setText(textMail);
        this.javaMailSender.send(mailMessage);

    }

}
