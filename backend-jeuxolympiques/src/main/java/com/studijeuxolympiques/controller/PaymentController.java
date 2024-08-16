package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.configuration.JwtService;
import com.studijeuxolympiques.dto.AuthenticationDTO;
import com.studijeuxolympiques.dto.OfferDTO;
import com.studijeuxolympiques.dto.PaymentDTO;
import com.studijeuxolympiques.model.Payment;
import com.studijeuxolympiques.service.KeyTransactionService;
import com.studijeuxolympiques.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Stream;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"api/users"})
public class PaymentController {


    /**
     * Build class PaymentController
     * Receive the request and provide the response
     * @property PaymentService
     * @requests Get and Post
     * @request Post to create Payment - to generate jwt token
     */


     final private PaymentService paymentService;
     final private KeyTransactionService keyTransactionService;

    @Autowired
    public PaymentController(PaymentService paymentService, KeyTransactionService keyTransactionService) {
        this.paymentService = paymentService;
        this.keyTransactionService = keyTransactionService;
    }

    @PostMapping("/transaction")
    public void createTransaction(@RequestBody Payment payment) {
        this.paymentService.createPayment(payment);
        this.keyTransactionService.createKeyTransaction();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping({"/{nameTransaction}"})
    public Stream<PaymentDTO> getByNameTransaction(@PathVariable String nameTransaction){
        return this.paymentService.getByNameTransaction(nameTransaction);
    }
}
