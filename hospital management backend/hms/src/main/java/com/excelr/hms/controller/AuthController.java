package com.excelr.hms.controller;

import com.excelr.hms.dto.RegistrationRequest;
import com.excelr.hms.model.User;
import com.excelr.hms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;

    public AuthController(UserService s) {
        this.userService = s;
    }

    // 1️⃣ Patient Registration (Public)
    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@Validated @RequestBody RegistrationRequest req) {
        if (userService.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setPhone(req.getPhone());
        User saved = userService.registerPatient(user);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    // 2️⃣ Doctor Registration (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/register-doctor")
    public ResponseEntity<?> registerDoctor(@Validated @RequestBody RegistrationRequest req) {
        if (userService.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User doctor = new User();
        doctor.setUsername(req.getUsername());
        doctor.setPassword(req.getPassword());
        doctor.setFirstName(req.getFirstName());
        doctor.setLastName(req.getLastName());
        doctor.setPhone(req.getPhone());
        doctor.setSpecialization("General Physician");
        User saved = userService.registerDoctor(doctor);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    // 3️⃣ Admin Registration (Public only once)
    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@Validated @RequestBody RegistrationRequest req) {
        if (userService.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User admin = new User();
        admin.setUsername(req.getUsername());
        admin.setPassword(req.getPassword());
        admin.setFirstName(req.getFirstName());
        admin.setLastName(req.getLastName());
        admin.setPhone(req.getPhone());
        User saved = userService.registerAdmin(admin);
        saved.setPassword(null);
        return ResponseEntity.ok(saved);
    }

    // 4️⃣ Login Check (used by frontend later)
    @GetMapping("/login-check")
    public ResponseEntity<?> loginCheck(Authentication auth) {
        if (auth == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok("Logged in as: " + auth.getName());
    }

    // Optional - ping test
    @GetMapping("/ping")
    public String ping() {
        return "HMS backend running";
    }
}
