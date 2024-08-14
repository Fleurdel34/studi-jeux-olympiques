package com.studijeuxolympiques.repository;

import com.studijeuxolympiques.model.Jwt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * Build JwtRepository
 * extends CrudRepository from tools Jpa
 * Create method findByValueAndDisabledAndExpired
 * @Params String value, boolean disabled, boolean expired
 * Create method findUserValidToken
 * @Params String username, boolean disabled, boolean expired
 * Create method findUserUserName
 * @params String username
 */

public interface JwtRepository extends JpaRepository<Jwt, Long> {

    Optional <Jwt> findByValueAndDisabledAndExpired(String value, boolean disabled, boolean expired);

    @Query("FROM Jwt j WHERE j.expired = :expired AND j.disabled = :disabled AND j.user.username = :username")
    Optional <Jwt> findUserValidToken(String username, boolean disabled, boolean expired);

    @Query("FROM Jwt j WHERE j.user.username = :username")
    Stream<Jwt> findUserUsername(String username);


    void deleteAllByExpiredAndDisabled(boolean expired, boolean disabled);
}
