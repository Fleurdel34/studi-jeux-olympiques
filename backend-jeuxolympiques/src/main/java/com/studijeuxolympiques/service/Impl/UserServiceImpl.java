package com.studijeuxolympiques.service.Impl;

import com.studijeuxolympiques.TypeRole;
import com.studijeuxolympiques.model.Role;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.model.Validation;
import com.studijeuxolympiques.repository.UserRepository;
import com.studijeuxolympiques.repository.ValidationRepository;
import com.studijeuxolympiques.service.UserService;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Create class UserServiceImpl
 * Execute business processing
 * Use the property UserRepository
 */

@NoArgsConstructor(force = true)
@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final ValidationRepository validationRepository;
    private final ValidationServiceImpl validationServiceImpl;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, ValidationRepository validationRepository,
                           ValidationServiceImpl validationServiceImpl) {
        this.userRepository = userRepository;
        this.validationRepository = validationRepository;
        this.validationServiceImpl = validationServiceImpl;

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

        user = this.userRepository.save(user);

        this.validationServiceImpl.saveValidation(user);
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

    public void activation(Map<String, String> activation){
        Validation validation = this.validationServiceImpl.readValidationCode(activation.get("code"));
        if (Instant.now().isAfter(validation.getExpired())) {
            throw new RuntimeException("Votre code a expiré");
        }
        User userEnabled = this.userRepository.findById(validation.getUser()
                        .getId()).orElseThrow(()-> new RuntimeException("Utilisateur inconnu"));

        userEnabled.setActive(true);
        this.userRepository.save(userEnabled);
        this.validationRepository.save(validation);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      return  this.userRepository
              .findByMail(username)
              .orElseThrow(() -> new UsernameNotFoundException("Aucun utilisateur n'a été identifié"));

    }
}
