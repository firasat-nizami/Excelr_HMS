package com.excelr.hms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
public class Prescription {
	 @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @ManyToOne
	    private User doctor;

	    @ManyToOne
	    private User patient;

	    @OneToOne
	    private Appointment appointment;

	    @Column(length = 2000)
	    private String prescriptionText;

	    private LocalDateTime issuedAt;

	    public Prescription() {}
	    // getters and setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public User getDoctor() { return doctor; }
	    public void setDoctor(User doctor) { this.doctor = doctor; }

	    public User getPatient() { return patient; }
	    public void setPatient(User patient) { this.patient = patient; }

	    public Appointment getAppointment() { return appointment; }
	    public void setAppointment(Appointment appointment) { this.appointment = appointment; }

	    public String getPrescriptionText() { return prescriptionText; }
	    public void setPrescriptionText(String prescriptionText) { this.prescriptionText = prescriptionText; }

	    public LocalDateTime getIssuedAt() { return issuedAt; }
	    public void setIssuedAt(LocalDateTime issuedAt) { this.issuedAt = issuedAt; }
}
