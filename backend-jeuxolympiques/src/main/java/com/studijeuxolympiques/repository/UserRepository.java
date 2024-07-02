package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}