package com.studijeuxolympiques.service;

import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.Charge;
import com.studijeuxolympiques.model.ChargeRequest;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import lombok.Data;


import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@Data
public class StripeService {

    @Value("${API_PRIVATE_KEY}")
    private String secretKey;

    @PostConstruct
    public void init(){
        Stripe.apiKey =secretKey;
    }

    public Charge charge(ChargeRequest chargeRequest) throws AuthenticationException, StripeException {
        Map<String, Object> chargeParams= new HashMap<>();
        chargeParams.put("amount", chargeRequest.getAmount());
        chargeParams.put("currency", chargeRequest.getCurrency());
        chargeParams.put("description", chargeRequest.getDescription());
        chargeParams.put("source", chargeRequest.getStripeToken());
        return Charge.create(chargeParams);
    }

}
