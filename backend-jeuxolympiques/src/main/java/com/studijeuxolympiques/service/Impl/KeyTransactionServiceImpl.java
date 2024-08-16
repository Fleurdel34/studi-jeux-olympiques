package com.studijeuxolympiques.service.Impl;


import com.studijeuxolympiques.model.KeyTransaction;
import com.studijeuxolympiques.repository.KeyTransactionRepository;

import com.studijeuxolympiques.service.KeyTransactionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Create class KeyTransactionServiceImpl
 * Execute business processing
 * Use the property PaymentRepository
 */


@AllArgsConstructor
@Service
public class KeyTransactionServiceImpl implements KeyTransactionService {

    @Autowired
    private KeyTransactionRepository keyTransactionRepository;

    @Override
    public void createKeyTransaction(){
        KeyTransaction keyTransaction = KeyTransaction.builder()
                .value(UUID.randomUUID().toString()).build();
        this.keyTransactionRepository.save(keyTransaction);
    }
}
