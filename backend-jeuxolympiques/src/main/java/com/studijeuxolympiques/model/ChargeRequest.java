package com.studijeuxolympiques.model;

import lombok.Data;

/**Build entity for charge*/
@Data
public class ChargeRequest {

    public enum Currency {
        EUR, USD;
    }
    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
}
