package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.Validation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Build ValidationRepository
 * extends CrudRepository from tools Jpa
 * Create method findByCode
 * @Params string code
 */


public interface ValidationRepository extends JpaRepository<Validation, Long> {


    Optional<Validation> findByCode(String code);
}
