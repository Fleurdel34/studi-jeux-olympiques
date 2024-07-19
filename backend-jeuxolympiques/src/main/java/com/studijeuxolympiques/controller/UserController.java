package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.UserService;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping({"api/users"})
public class UserController {

    /**
     * Build class UserController
     * Receive the request and provide the response
     * @property UserService
     * @requests Get, Post, and Put
     */

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
    public Map<String, String> connectionUser() {

    }

    @GetMapping({"/{id}"})
    public User getUserById(@PathVariable Long id) {
        return this.userService.getUserById(id);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        this.userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(updatedUser);
    }
}

