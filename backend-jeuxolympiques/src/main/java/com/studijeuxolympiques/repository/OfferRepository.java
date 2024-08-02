package com.studijeuxolympiques.repository;


import com.studijeuxolympiques.model.Offer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Build OfferRepository
 * extends CrudRepository from tools Jpa
 */


public interface OfferRepository extends JpaRepository<Offer, Long> {

}
