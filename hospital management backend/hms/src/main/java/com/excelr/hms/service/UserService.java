package com.excelr.hms.service;

import com.excelr.hms.model.Role;
import com.excelr.hms.model.User;
import com.excelr.hms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.userRepository = repo;
        this.passwordEncoder = encoder;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public String encodePassword(String raw) {
        return passwordEncoder.encode(raw);
    }

    // Register a patient
    public User registerPatient(User user) {
        user.setRole(Role.ROLE_PATIENT);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Register a doctor (Admin only)
    public User registerDoctor(User user) {
        user.setRole(Role.ROLE_DOCTOR);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Register an admin (only for first setup or internal)
    public User registerAdmin(User user) {
        user.setRole(Role.ROLE_ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
