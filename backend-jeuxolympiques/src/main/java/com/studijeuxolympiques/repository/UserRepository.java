package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Build UserRepository
 * extends CrudRepository from tools Jpa
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}