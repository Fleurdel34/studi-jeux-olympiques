package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.TypeRole;
import com.studijeuxolympiques.model.Role;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.UserRepository;
import com.studijeuxolympiques.service.UserService;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Create class UserServiceImpl
 * Execute business processing
 * Use the property UserRepository
 */

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    public User getUserById(Long id) {
        return this.userRepository.findById(id).orElse(null);
    }

    public void createUser(User user) {
        if(!user.getMail().contains("@")){
            throw new RuntimeException("Votre email est invalide");
        }

        if(!user.getMail().contains(".")){
            throw new RuntimeException("Votre email est invalide");
        }

        Optional<User> userOptional = this.userRepository.findByMail(user.getMail());
        if(userOptional.isPresent()){
            throw new RuntimeException("Votre email est déjà utilisée");
        }

        String passwordCrypt = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordCrypt);

        Role roleUser = new Role();
        roleUser.setRole(TypeRole.USER);
        user.setRole(roleUser);

        this.userRepository.save(user);

    }

    /**
     * Update properties of instance of User Object
     * @param id
     * @param updatedUser
     * @return save model User update with new property
     */
    public User updateUser(Long id, User updatedUser) {
        User oldUser = this.getUserById(id);
        if (oldUser != null) {
            oldUser.setFirstname(updatedUser.getFirstname());
            oldUser.setLastname(updatedUser.getLastname());
            oldUser.setMail(updatedUser.getMail());
            oldUser.setUsername(updatedUser.getUsername());
            oldUser.setPassword(updatedUser.getPassword());
        }

        return (User)this.userRepository.save(oldUser);
    }

    public void deleteUser(Long id) {
        this.userRepository.deleteById(id);
    }
}
