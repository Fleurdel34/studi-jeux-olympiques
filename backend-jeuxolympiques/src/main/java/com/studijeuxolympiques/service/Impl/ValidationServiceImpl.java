package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.model.Validation;
import com.studijeuxolympiques.repository.ValidationRepository;
import com.studijeuxolympiques.service.ValidationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Random;

import static java.time.temporal.ChronoUnit.MINUTES;

/**
 * Create class ValidationServiceImpl
 * Execute business processing
 * Use the property ValidationRepository and NotificationServiceImpl
 */


@Transactional
@Service
public class ValidationServiceImpl implements ValidationService {

    private static final Logger log = LoggerFactory.getLogger(ValidationServiceImpl.class);
    private final ValidationRepository validationRepository;

    private final NotificationServiceImpl notificationServiceImpl;

    @Autowired
    public ValidationServiceImpl(ValidationRepository validationRepository, NotificationServiceImpl notificationServiceImpl) {
        this.validationRepository = validationRepository;
        this.notificationServiceImpl=notificationServiceImpl;
    }

    @Override
    public void saveValidation(User user) {

        Validation validation = new Validation();
        validation.setUser(user);

        Instant creation = Instant.now();
        validation.setCreation(creation);

        Instant expired = creation.plus(10, MINUTES);
        validation.setExpired(expired);

        Random random = new Random();
        int randomInteger = random.nextInt(999999);

        String code = String.format("%06d", randomInteger);

        validation.setCode(code);

        this.validationRepository.save(validation);
        this.notificationServiceImpl.sendMessage(validation);
    }

    public Validation readValidationCode (String code){
        return this.validationRepository
                .findByCode(code)
                .orElseThrow(() -> new RuntimeException("Votre code est invalide"));
    }
}
