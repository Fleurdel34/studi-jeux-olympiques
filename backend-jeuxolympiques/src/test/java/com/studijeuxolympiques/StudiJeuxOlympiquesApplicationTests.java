package com.studijeuxolympiques;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.studijeuxolympiques.controller.UserController;

import com.studijeuxolympiques.model.Role;
import com.studijeuxolympiques.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StudiJeuxOlympiquesApplicationTests {

    @Autowired
    private UserController controller;

    @Test
    void contextLoads() throws Exception{
        assertThat(controller).isNotNull();
    }

	@Autowired
	private MockMvc mockMvc;


    @Test
    @WithMockUser
    public void shouldReturnUserPage() throws Exception{
        mockMvc.perform(get("/api/users")).andDo(print()).andExpect(status().isOk());
    }

    
	@Autowired
	private ObjectMapper objectMapper;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

	@Test
	public void createUser() throws Exception {

        User user1 = new User();
        user1.setLastname("GINO");
        user1.setFirstname("José");
        user1.setUsername("jose");
        user1.setMail("josegino@test.com");
        user1.setPassword("joseGINO32*");

        Role roleUser = new Role();
        roleUser.setRole(TypeRole.USER);
        user1.setRole(roleUser);

       String passwordCrypt = this.passwordEncoder.encode(user1.getPassword());
        user1.setPassword(passwordCrypt);

        ResultActions resultActions = mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .content(objectMapper.writeValueAsString(user1)))
                        .andExpect(status().isOk());
    }
}

