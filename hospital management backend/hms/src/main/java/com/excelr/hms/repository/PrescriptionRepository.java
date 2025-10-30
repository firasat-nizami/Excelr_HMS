package com.excelr.hms.repository;

import com.excelr.hms.model.Prescription;
import com.excelr.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
	 List<Prescription> findByPatient(User patient);
	 List<Prescription> findByDoctor(User doctor);
}
