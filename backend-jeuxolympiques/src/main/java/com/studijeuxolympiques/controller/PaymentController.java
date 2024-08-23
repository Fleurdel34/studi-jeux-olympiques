package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.Payment;
import com.studijeuxolympiques.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.stream.Stream;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"api/payment"})
public class PaymentController {


    /**
     * Build class PaymentController
     * Receive the request and provide the response
     * @property TestingPayment
     * @requests Get and Post
     * @request Post to create Payment - to generate jwt token
     */


     final private PaymentService paymentService;


    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PreAuthorize("hasAuthority('USER_CREATE_PAYMENT')")
    @PostMapping
    public Long createTransaction(@RequestBody Payment payment) {
        return this.paymentService.createPayment(payment);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PreAuthorize("hasAuthority('ADMIN_READ')")
    @GetMapping
    public Stream <PaymentDTO> getAllPayments(){
        return this.paymentService.getAllPayments();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping({"/{id}"})
    public Stream<PaymentDTO> getPaymentById(@PathVariable Long id){
        return this.paymentService.getPaymentById(id);
    }





}
