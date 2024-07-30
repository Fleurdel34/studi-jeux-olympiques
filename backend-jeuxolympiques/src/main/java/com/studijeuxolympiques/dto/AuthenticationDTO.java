package com.studijeuxolympiques.dto;


/**
 * Create Record to recover two params of User
 * @param username
 * @param password
 */

public record AuthenticationDTO(String username, String password) {

}
