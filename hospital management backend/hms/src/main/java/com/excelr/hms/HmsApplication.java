package com.excelr.hms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.excelr.hms.model.Role;
import com.excelr.hms.model.User;
import com.excelr.hms.repository.UserRepository;

@SpringBootApplication
public class HmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HmsApplication.class, args);
	}
	
	
    }

