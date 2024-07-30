package com.studijeuxolympiques.service;

import com.studijeuxolympiques.model.Validation;

/**
 * Implements interface of service
 * implements business logic
 */

public interface NotificationService {

    void sendMessage(Validation validation);
}
