package com.studijeuxolympiques.service;

import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.Payment;

import java.util.stream.Stream;

/**
 * Implements interface of service
 * implements business logic
 */

public interface PaymentService {

    Long createPayment(Payment payment);

    Stream<PaymentDTO> getAllPayments();

    Stream<PaymentDTO> getPaymentById(Long id);


}
