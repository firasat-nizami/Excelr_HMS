package com.excelr.hms.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AppointmentRequest {
	  @NotNull
	    private Long doctorId;

	    @NotNull
	    private LocalDateTime appointmentTime;

	    private String notes;

	    // getters/setters
	    public Long getDoctorId() { return doctorId; }
	    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

	    public LocalDateTime getAppointmentTime() { return appointmentTime; }
	    public void setAppointmentTime(LocalDateTime appointmentTime) { this.appointmentTime = appointmentTime; }

	    public String getNotes() { return notes; }
	    public void setNotes(String notes) { this.notes = notes; }
}
