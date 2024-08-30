package com.studijeuxolympiques.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;

/** Create account to access api
 * security api back end
 * @request post: permitall
 * @method filter to verify identified user
 */

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SpringSecurityConfig {


    private final JwtFilter jwtFilter;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserDetailsService userDetailsService;

    public SpringSecurityConfig(JwtFilter jwtFilter, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDetailsService = userDetailsService;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
            return httpSecurity
                    .csrf(AbstractHttpConfigurer:: disable)
                    .authorizeHttpRequests(authorize-> {
                            authorize.requestMatchers(POST, "/api/users").permitAll();
                            authorize.requestMatchers(POST, "/api/users/activation").permitAll();
                            authorize.requestMatchers(POST, "/api/users/connection").permitAll();
                            authorize.requestMatchers(GET, "/api/offers").permitAll();
                            authorize.requestMatchers(GET, "/api/offers/{id}").permitAll();
                            authorize.requestMatchers(POST, "/checkout").permitAll();
                            authorize.requestMatchers(POST, "/charge").permitAll();
                            authorize.anyRequest().authenticated();
                    })
                    .sessionManagement(httpSecuritySessionManagementConfigurer ->
                            httpSecuritySessionManagementConfigurer
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
                    .build();
    }

    /**
     *Managing users when trying to log in
     * @return  authentication
     *
     */

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Create Bean with AuthenticationProvider
     * @return Access BDD POO
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return daoAuthenticationProvider;
    }
}

