package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Build UserRepository
 * extends CrudRepository from tools Jpa
 * Create method findByUsername
 * @Params string email
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByMail(String mail);
}