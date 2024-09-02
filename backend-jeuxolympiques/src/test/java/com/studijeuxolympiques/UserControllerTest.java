package com.studijeuxolympiques;


import com.google.gson.Gson;

import com.studijeuxolympiques.configuration.JwtFilter;
import com.studijeuxolympiques.configuration.JwtService;
import com.studijeuxolympiques.controller.UserController;
import com.studijeuxolympiques.enumerations.TypeRole;
import com.studijeuxolympiques.model.Role;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.repository.UserRepository;
import com.studijeuxolympiques.service.Impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Implements test for the UserController class
 * implements test for two requests post and get
 */

@WebMvcTest(value = UserController.class)
public class UserControllerTest {

    @MockBean
    UserServiceImpl userService;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    JwtFilter jwtFilter;

    @MockBean
    JwtService jwtService;

    @MockBean
    UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void shouldReturnUserPage() throws Exception{
        this.mockMvc.perform(get("/api/users")).andDo(print()).andExpect(status().isOk());
    }


    @Test
    @WithMockUser(authorities = {"USER"})
    public void createUser() throws Exception {
        
        User user = new User();
        user.setLastname("GINO");
        user.setFirstname("José");
        user.setUsername("jose");
        user.setMail("josegino@test.com");
        user.setPassword("joseGINO32*");

        Role roleUser = new Role();
        roleUser.setRole(TypeRole.USER);
        user.setRole(roleUser);
        
        this.userService.createUser(user);

        Gson gson = new Gson();
        String userJson = gson.toJson(user);

        this.mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(userJson)
                .with(csrf()))
                .andExpect(status().isOk());
    }
}
