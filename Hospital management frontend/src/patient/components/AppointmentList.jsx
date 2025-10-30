import React, { useEffect, useState } from "react";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  if (!appointments.length) {
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <h3>Your booked appointments</h3>
        <p>No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <h3>Your booked appointments</h3>
      <div style={{ display: "grid", gap: 12 }}>
        {appointments.map((a, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <strong>
                {a.firstName} {a.lastName}
              </strong>
              <span>• {a.gender || "-"}</span>
              <span>• DOB: {a.dob || "-"}</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <div>Department: {a.department}</div>
              <div>
                Doctor: {a.doctorFirstName} {a.doctorLastName}
              </div>
              <div>Appointment Date: {a.appointmentDate}</div>
            </div>
            <div style={{ marginTop: 6, color: "#374151" }}>
              <div>Email: {a.email}</div>
              <div>Phone: {a.phone}</div>
              <div>Address: {a.address || "-"}</div>
              <div>Visited Before: {a.hasVisited ? "Yes" : "No"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;


