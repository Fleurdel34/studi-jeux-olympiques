package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.dto.OfferDTO;
import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.KeyTransaction;
import com.studijeuxolympiques.model.Payment;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.PaymentRepository;
import com.studijeuxolympiques.service.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.stream.Stream;

/**
 * Create class PaymentServiceImpl
 * Execute business processing
 * Use the property PaymentRepository
 */


@AllArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;


    @Override
    public void createPayment(Payment payment){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        payment.setUser(user);

        this.paymentRepository.save(payment);
    }

    @Override
    public Stream<PaymentDTO> getByNameTransaction(String nameTransaction){
        return this.paymentRepository.findByNameTransaction(nameTransaction)
                .stream().map(payment -> new PaymentDTO(payment.getNameTransaction(), payment.getPrice()));
    }


}
