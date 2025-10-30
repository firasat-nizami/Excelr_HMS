package com.excelr.hms.service;

import com.excelr.hms.model.Appointment;
import com.excelr.hms.model.User;
import com.excelr.hms.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
	private final AppointmentRepository repo;

    public AppointmentService(AppointmentRepository repo) {
        this.repo = repo;
    }
    
    public List<Appointment> findAll() { return repo.findAll(); }

    public Appointment save(Appointment appointment) {
        return repo.save(appointment);
    }

    public Optional<Appointment> findById(Long id) {
        return repo.findById(id);
    }

    public List<Appointment> findByPatient(User patient) {
        return repo.findByPatient(patient);
    }

    public List<Appointment> findByDoctor(User doctor) {
        return repo.findByDoctor(doctor);
    }
}
