package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.dto.OfferDTO;
import com.studijeuxolympiques.model.Offer;
import com.studijeuxolympiques.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.stream.Stream;

/**
 * Build class OfferController
 * Receive the request and provide the response
 * property OfferService
 * requests Get, Post, and Put
 */

@RequestMapping("api/offers")
@RestController
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @PreAuthorize("hasAuthority('ADMIN_CREATE')")
    @PostMapping
    public void createOffer(@RequestBody Offer offer){
        this.offerService.createOffer(offer);
    }

    @GetMapping
    public Stream<OfferDTO> getAllOffer(){
        return this.offerService.getAllOffers();
    }

    @GetMapping({"/{id}"})
    public Stream<OfferDTO> getOfferById(@PathVariable Long id){
        return this.offerService.getOfferById(id);
    }


    @PreAuthorize("hasAuthority('ADMIN_DELETE')")
    @DeleteMapping("/{id}")
    public void deleteOfferById(@PathVariable Long id){
        this.offerService.deleteOfferById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN_UPDATE')")
    @PutMapping({"/{id}"})
    public ResponseEntity<Offer> updateOffer(@PathVariable("id") Long id, @RequestBody Offer updatedOffer) {
        this.offerService.updateOffer(id, updatedOffer);
        return ResponseEntity.ok(updatedOffer);
    }

}
