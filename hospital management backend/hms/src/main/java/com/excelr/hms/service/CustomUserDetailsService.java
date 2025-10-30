package com.excelr.hms.service;


import com.excelr.hms.model.User;
import com.excelr.hms.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> o = userRepository.findByUsername(username);
        if (o.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }

        User user = o.get();

        // Notice the full class name below
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name().replace("ROLE_", "")) // Spring adds ROLE_ automatically
                .build();
    }
}
