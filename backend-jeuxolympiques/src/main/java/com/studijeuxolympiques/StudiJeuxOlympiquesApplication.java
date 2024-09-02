package com.studijeuxolympiques;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


/**
 * @author johanna
 * @version 1.0.0
 */

@EnableScheduling
@SpringBootApplication
public class StudiJeuxOlympiquesApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudiJeuxOlympiquesApplication.class, args);
	}


}
