package com.studijeuxolympiques.dto;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * Create Record to recover two params of User
 * @param username
 * @param password
 */

public record AuthenticationDTO(String username, String password) {
}
