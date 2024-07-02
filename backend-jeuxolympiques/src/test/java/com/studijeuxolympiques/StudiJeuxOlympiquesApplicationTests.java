package com.studijeuxolympiques;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.studijeuxolympiques.controller.UserController;
import com.studijeuxolympiques.model.User;
import com.studijeuxolympiques.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@WebMvcTest({UserController.class})
class StudiJeuxOlympiquesApplicationTests {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private UserService userService;
	@Autowired
	private ObjectMapper objectMapper;

	StudiJeuxOlympiquesApplicationTests() {
	}

	@Test
	public void testGetUsers() throws Exception {
		this.mockMvc.perform(MockMvcRequestBuilders.get("/users", new Object[0])).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void createUser() throws Exception {
		User user1 = new User("José", "GINO", 104768212, "josegino@test.com", "joseGINO32*");
		this.mockMvc.perform(MockMvcRequestBuilders.post("/users", new Object[0]).contentType(MediaType.APPLICATION_JSON).content(this.objectMapper.writeValueAsString(user1))).andExpect(MockMvcResultMatchers.status().isOk());
	}
}

