package com.studijeuxolympiques.service;

import com.studijeuxolympiques.model.Offer;
import java.util.List;

/**
 * Implements interface of service
 * implements business logic
 */

public interface OfferService {

    List<Offer> getAllOffers();

    Offer getOfferById(Long id);

    void createOffer(Offer offer);

    void updateOffer(Long id, Offer updatedOffer);

    void deleteOfferById(Long id);
}
