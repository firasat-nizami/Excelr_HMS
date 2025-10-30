package com.excelr.hms.controller;

import com.excelr.hms.dto.PrescriptionRequest;
import com.excelr.hms.model.Appointment;
import com.excelr.hms.model.Prescription;
import com.excelr.hms.model.Role;
import com.excelr.hms.model.User;
import com.excelr.hms.service.AppointmentService;
import com.excelr.hms.service.PrescriptionService;
import com.excelr.hms.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
	private final PrescriptionService prescriptionService;
    private final AppointmentService appointmentService;
    private final UserService userService;

    public PrescriptionController(PrescriptionService p, AppointmentService a, UserService u) {
        this.prescriptionService = p;
        this.appointmentService = a;
        this.userService = u;
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @PostMapping("/issue")
    public ResponseEntity<?> issue(@Valid @RequestBody PrescriptionRequest req, Authentication auth) {
        Long apptId = req.getAppointmentId();
        Appointment ap = appointmentService.findById(apptId).orElse(null);
        if (ap == null) return ResponseEntity.badRequest().body("Invalid appointment");
        User doctor = userService.findByUsername(auth.getName()).orElseThrow();
        if (!ap.getDoctor().getId().equals(doctor.getId())) {
            return ResponseEntity.status(403).body("You are not allowed to issue for this appointment");
        }
        Prescription p = new Prescription();
        p.setAppointment(ap);
        p.setDoctor(doctor);
        p.setPatient(ap.getPatient());
        p.setPrescriptionText(req.getPrescriptionText());
        p.setIssuedAt(LocalDateTime.now());
        prescriptionService.save(p);
        return ResponseEntity.ok(p);
    }

    // Patient can view their prescriptions
    @GetMapping("/my")
    public ResponseEntity<?> myPrescriptions(Authentication auth) {
        User u = userService.findByUsername(auth.getName()).orElseThrow();
        if (u.getRole() == Role.ROLE_DOCTOR) {
            List<Prescription> list = prescriptionService.findByDoctor(u);
            return ResponseEntity.ok(list);
        } else {
            List<Prescription> list = prescriptionService.findByPatient(u);
            return ResponseEntity.ok(list);
        }
    }
}
