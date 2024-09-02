package com.studijeuxolympiques.service;

import com.studijeuxolympiques.dto.OfferDTO;
import com.studijeuxolympiques.model.Offer;

import java.util.stream.Stream;

/**
 * Implements interface of service
 * implements business logic
 */

public interface OfferService {

    Stream<OfferDTO> getAllOffers();

    Stream<OfferDTO> getOfferById(Long id);

    void createOffer(Offer offer);

    Offer getPutOfferById(Long id);

    void updateOffer(Long id, Offer updatedOffer);

    void deleteOfferById(Long id);
}
