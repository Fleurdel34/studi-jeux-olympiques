package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.configuration.JwtService;
import com.studijeuxolympiques.dto.AuthenticationDTO;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.UserService;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"api/users"})
public class UserController {

    /**
     * Build class UserController
     * Receive the request and provide the response
     * @property UserService
     * @requests Get, Post, and Put
     * @request Post to create User - to enable account with code  - to connect - to disconnect
     */

    final private AuthenticationManager authenticationManager;
    final private UserService userService;
    final private JwtService jwtService;

    @Autowired
    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        this.userService.createUser(user);
    }

    /** Build special request post for activation Code
    * @params Request body Map string
    **/
    @PostMapping("/activation")
    public void activationUser(@RequestBody Map<String, String>  activation) {
        this.userService.activation(activation);
    }


    /** Build special request post for connexion
     * @params Request body Map string
     **/
    @PostMapping("/connection")
    public Map<String, String> connectionUser(@RequestBody AuthenticationDTO authenticationDTO) {
        final Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken
                        (authenticationDTO.username(), authenticationDTO.password()));
        if(authenticate.isAuthenticated()){
            return this.jwtService.generate(authenticationDTO.username());
        }
        return null;
    }

    @PostMapping("/disconnection")
    public void disconnectionUser() {
        this.jwtService.disconnection();
    }

    @GetMapping({"/{id}"})
    public User getUserById(@PathVariable("id") Long id) {
        return this.userService.getUserById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN_READ')")
    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User updatedUser) {
        this.userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable("id") Long id){
        this.userService.deleteUserById(id);
    }
}

