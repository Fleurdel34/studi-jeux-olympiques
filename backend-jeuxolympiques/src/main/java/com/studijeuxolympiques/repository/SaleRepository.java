package com.studijeuxolympiques.repository;


import com.studijeuxolympiques.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Build SaleRepository
 * extends CrudRepository from tools Jpa
 * Create method findByOfferId
 * @Params Long offerName
 */

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Sale findByNameOffer(String nameOffer);
}
