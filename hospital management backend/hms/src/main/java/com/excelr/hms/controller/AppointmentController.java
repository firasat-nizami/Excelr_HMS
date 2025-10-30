package com.excelr.hms.controller;

import com.excelr.hms.dto.AppointmentRequest;
import com.excelr.hms.model.Appointment;
import com.excelr.hms.model.Role;
import com.excelr.hms.model.User;
import com.excelr.hms.service.AppointmentService;
import com.excelr.hms.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
	private final AppointmentService appointmentService;
    private final UserService userService;

    public AppointmentController(AppointmentService a, UserService u) {
        this.appointmentService = a;
        this.userService = u;
    }

    // Patient books appointment
    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("/book")
    public ResponseEntity<?> book(@Valid @RequestBody AppointmentRequest req, Authentication auth) {
        String username = auth.getName();
        User patient = userService.findByUsername(username).orElseThrow();
        User doctor = userService.findById(req.getDoctorId()).orElseThrow();

        Appointment ap = new Appointment();
        ap.setPatient(patient);
        ap.setDoctor(doctor);
        ap.setAppointmentTime(req.getAppointmentTime());
        ap.setStatus("SCHEDULED");
        ap.setNotes(req.getNotes());
        appointmentService.save(ap);
        return ResponseEntity.ok(ap);
    }

    // List appointments for current user (patient or doctor)
    @GetMapping("/my")
    public ResponseEntity<?> myAppointments(Authentication auth) {
        User user = userService.findByUsername(auth.getName()).orElseThrow();
        if (user.getRole() == Role.ROLE_DOCTOR) {
            List<Appointment> list = appointmentService.findByDoctor(user);
            return ResponseEntity.ok(list);
        } else if (user.getRole() == Role.ROLE_PATIENT) {
            List<Appointment> list = appointmentService.findByPatient(user);
            return ResponseEntity.ok(list);
        } else {
            // admin sees all
            return ResponseEntity.ok(appointmentService.findAll());
        }
    }

    // Cancel appointment (patient, doctor or admin)
    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Long id, Authentication auth) {
        Optional<Appointment> o = appointmentService.findById(id);
        if (o.isEmpty()) return ResponseEntity.notFound().build();

        Appointment ap = o.get();
        // permission: patient who booked, doctor who is assigned, or admin
        User u = userService.findByUsername(auth.getName()).orElseThrow();
        boolean allowed = u.getRole().name().equals("ROLE_ADMIN") ||
                          ap.getPatient().getUsername().equals(u.getUsername()) ||
                          ap.getDoctor().getUsername().equals(u.getUsername());
        if (!allowed) return ResponseEntity.status(403).body("Not allowed");
        ap.setStatus("CANCELLED");
        appointmentService.save(ap);
        return ResponseEntity.ok(ap);
    }
}
