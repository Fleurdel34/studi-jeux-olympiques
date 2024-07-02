package com.studijeuxolympiques.controller;

import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/users"})
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        this.userService.createUser(user);
    }

    @GetMapping({"{id}"})
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

