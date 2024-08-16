package com.studijeuxolympiques.repository;


import com.studijeuxolympiques.model.KeyTransaction;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * Build OfferRepository
 * extends CrudRepository from tools Jpa
 */

public interface KeyTransactionRepository extends JpaRepository<KeyTransaction, Long> {
}
