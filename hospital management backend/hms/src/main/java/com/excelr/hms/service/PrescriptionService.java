package com.excelr.hms.service;

import com.excelr.hms.model.Prescription;
import com.excelr.hms.model.User;
import com.excelr.hms.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {
	private final PrescriptionRepository repo;

    public PrescriptionService(PrescriptionRepository repo) {
        this.repo = repo;
    }

    public Prescription save(Prescription p) { return repo.save(p); }

    public Optional<Prescription> findById(Long id) { return repo.findById(id); }

    public List<Prescription> findByPatient(User patient) { return repo.findByPatient(patient); }

    public List<Prescription> findByDoctor(User doctor) { return repo.findByDoctor(doctor); }
}
