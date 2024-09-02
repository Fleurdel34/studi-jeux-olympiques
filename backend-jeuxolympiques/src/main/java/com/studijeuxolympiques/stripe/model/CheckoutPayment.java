package com.studijeuxolympiques.stripe.model;

import lombok.Data;

/**
 * Build Class CheckoutPayment for Api payment
 * Set up properties (name, currency, successUrl, cancelUrl, amount and quantity)
 */

@Data
public class CheckoutPayment {
    private String name;
    private String currency;
    private String successUrl;
    private String cancelUrl;
    private long amount;
    private long quantity;

}
