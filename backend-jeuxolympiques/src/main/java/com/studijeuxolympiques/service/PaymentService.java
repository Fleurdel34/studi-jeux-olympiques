package com.studijeuxolympiques.service;

import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.Payment;

import java.util.List;
import java.util.stream.Stream;

/**
 * Implements interface of service
 * implements business logic
 */

public interface PaymentService {

    void createPayment(Payment payment);

    Stream<PaymentDTO> getAllPayments();


}
