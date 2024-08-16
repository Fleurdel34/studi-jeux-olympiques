package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Build PaymentRepository
 * extends CrudRepository from tools Jpa
 */

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByNameTransaction(String nameTransaction);
}
