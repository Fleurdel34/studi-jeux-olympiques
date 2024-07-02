package com.studijeuxolympiques.service;



import com.studijeuxolympiques.model.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    void createUser(User user);

    User updateUser(Long id, User updatedUser);

    void deleteUser(Long id);
}
