package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.dto.OfferDTO;
import com.studijeuxolympiques.model.Offer;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.OfferRepository;
import com.studijeuxolympiques.service.OfferService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.stream.Stream;


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
    public Stream<OfferDTO> getAllOffers() {
        return this.offerRepository.findAll()
                .stream().map(offer -> new OfferDTO(offer.getId(),
                        offer.getName(), offer.getPrice(), offer.getDescription()));

    }

    @Override
    public void createOffer(Offer offer) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        offer.setUser(user);
        this.offerRepository.save(offer);
    }

    @Override
    public Stream<OfferDTO> getOfferById(Long id) {
        return this.offerRepository.findById(id).stream().map(offer -> new OfferDTO(offer.getId(),
                offer.getName(), offer.getPrice(), offer.getDescription()));
    }

    @Override
    public void deleteOfferById(Long id){
        this.offerRepository.deleteById(id);
    }

    @Override
    public Offer getPutOfferById(Long id) {
        return this.offerRepository.findById(id).orElse(null);
    }

    @Override
    public void updateOffer(Long id, Offer updatedOffer){
        Offer oldOffer = this. getPutOfferById(id);
        if(null != oldOffer){
            oldOffer.setName(updatedOffer.getName());
            oldOffer.setDescription(updatedOffer.getDescription());
            oldOffer.setPrice(updatedOffer.getPrice());
            this.offerRepository.save(oldOffer);
        }
    }
}
