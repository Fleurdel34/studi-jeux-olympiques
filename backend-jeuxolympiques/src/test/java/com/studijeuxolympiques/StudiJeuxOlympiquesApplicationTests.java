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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
		mockMvc.perform(get("/users"))
				.andExpect(status().isOk());
	}

	@Test
	public void createUser() throws Exception {
		User user1 = new User("GINO", "José", 0132016013L, "josegino@test.com", "joseGINO32*");
		mockMvc.perform(post("/users")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(user1)))
				.andExpect(status().isOk());
	}
}

