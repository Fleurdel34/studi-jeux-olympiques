package com.studijeuxolympiques.service;
import com.studijeuxolympiques.model.User;
import java.util.List;
import java.util.Map;

/**
 * Implements interface of service
 * implements business logic
 */

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    void createUser(User user);

    User updateUser(Long id, User updatedUser);

    void deleteUserById(Long id);

    void activation(Map<String, String> activation);
}
