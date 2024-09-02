package com.studijeuxolympiques.dto;

/**
 * Create Record to recover two params of User
 * @param id
 * @param nameTransaction
 * @param price
 * @param keyTransaction
 */

public record PaymentDTO(
        Long id,
        String nameTransaction,
        float price,
        String keyTransaction
) {
}
