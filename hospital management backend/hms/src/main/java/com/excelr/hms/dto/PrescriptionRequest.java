package com.excelr.hms.dto;

import jakarta.validation.constraints.NotNull;

public class PrescriptionRequest {
	@NotNull
    private Long appointmentId;

    @NotNull
    private String prescriptionText;

    // getters/setters
    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getPrescriptionText() { return prescriptionText; }
    public void setPrescriptionText(String prescriptionText) { this.prescriptionText = prescriptionText; }
}
