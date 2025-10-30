package com.excelr.hms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {
	 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    // references to User (patient and doctor)
	    @ManyToOne
	    @JoinColumn(name = "patient_id")
	    private User patient;

	    @ManyToOne
	    @JoinColumn(name = "doctor_id")
	    private User doctor;

	    private LocalDateTime appointmentTime;

	    private String status; // SCHEDULED / CANCELLED / COMPLETED

	    private String notes;

	    public Appointment() {}
	    // getters and setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public User getPatient() { return patient; }
	    public void setPatient(User patient) { this.patient = patient; }

	    public User getDoctor() { return doctor; }
	    public void setDoctor(User doctor) { this.doctor = doctor; }

	    public LocalDateTime getAppointmentTime() { return appointmentTime; }
	    public void setAppointmentTime(LocalDateTime appointmentTime) { this.appointmentTime = appointmentTime; }

	    public String getStatus() { return status; }
	    public void setStatus(String status) { this.status = status; }

	    public String getNotes() { return notes; }
	    public void setNotes(String notes) { this.notes = notes; }
}
