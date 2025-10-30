package com.excelr.hms.repository;

import com.excelr.hms.model.Appointment;
import com.excelr.hms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	 List<Appointment> findByPatient(User patient);
	 List<Appointment> findByDoctor(User doctor);
}
