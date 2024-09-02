package com.studijeuxolympiques.stripe.controller;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.studijeuxolympiques.stripe.model.CheckoutPayment;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Build class StripeController
 * Receive the request and provide the response
 * Stripe is an Api payment
 * request Post
 */

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value="/api/stripe")
public class StripeController {

    private static final Gson gson = new Gson();
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/payment")
    public String paymentWithCheckoutPage(@RequestBody CheckoutPayment payment) throws StripeException{
        init();

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT).setSuccessUrl(payment.getSuccessUrl())
                .setCancelUrl(payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder().setQuantity(payment.getQuantity())
                                .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                        .setCurrency(payment.getCurrency()).setUnitAmount(payment.getAmount())
                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName(payment.getName()).build())
                                        .build())
                                .build())
                .build();

        Session session = Session.create(params);
        Map<String, String> responseData= new HashMap<>();
        responseData.put("id", session.getId());
        return gson.toJson(responseData);
    }

    private static void init(){
        Stripe.apiKey="sk_test_51PsNEeL5bDlrJQqaMTWZRbluY1YyrPPEdIdTcZHcMbrcm2H2mXtzXXRKu7RvqPDBPVEr6ykpctgARxATDXKPjeuK00CBfIlYlr";
    }
}
