package com.studijeuxolympiques.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.http.HttpMethod.POST;

/** Create account to access api
 * security api back end
 * @request post: permitall
 */

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
            return httpSecurity
                    .csrf(AbstractHttpConfigurer:: disable)
                    .authorizeHttpRequests(authorize-> {
                            authorize.requestMatchers(POST, "/api/users").permitAll();
                            authorize.requestMatchers(POST, "/api/users/activation").permitAll();
                            authorize.anyRequest().authenticated();
            }).build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}

