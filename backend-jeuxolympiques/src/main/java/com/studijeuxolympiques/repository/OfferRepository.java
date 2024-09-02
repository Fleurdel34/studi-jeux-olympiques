package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;



/**
 * Build OfferRepository
 * extends CrudRepository from tools Jpa
 */


public interface OfferRepository extends JpaRepository<Offer, Long> {

}
