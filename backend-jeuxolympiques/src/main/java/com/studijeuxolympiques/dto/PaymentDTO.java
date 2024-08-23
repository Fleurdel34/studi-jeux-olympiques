package com.studijeuxolympiques.dto;

public record PaymentDTO(
        Long id,
        String nameTransaction,
        float price,
        String keyTransaction
) {
}
