package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.model.Offer;
import com.studijeuxolympiques.repository.OfferRepository;
import com.studijeuxolympiques.service.OfferService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Create class OfferServiceImpl
 * Execute business processing
 * Use the property OfferRepository
 */


@AllArgsConstructor
@Service
public class OfferServiceImpl implements OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Override
    public List<Offer> getAllOffers() {
        return this.offerRepository.findAll();
    }

    @Override
    public void createOffer(Offer offer) {
        this.offerRepository.save(offer);
    }

    @Override
    public Offer getOfferById(Long id) {
        return this.offerRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteOfferById(Long id){
        this.offerRepository.deleteById(id);
    }

    @Override
    public void updateOffer(Long id, Offer offer){
        Offer oldOffer = this.getOfferById(id);
        if(oldOffer !=null){
            oldOffer.setName(offer.getName());
            oldOffer.setDescription(offer.getDescription());
            oldOffer.setPrice(offer.getPrice());
            this.offerRepository.save(oldOffer);
        }

    }
}
