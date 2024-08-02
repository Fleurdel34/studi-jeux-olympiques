package com.studijeuxolympiques.service;

import com.studijeuxolympiques.model.Sale;

/**
 * Implements interface of service
 * implements business logic
 */

public interface SaleService {

    void createSale(Sale sale);
    Sale getByNameOffer(String nameOffer);
}
