import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <img
        src="/admin/logo.png"
        alt="Excelr Logo"
        style={{ width: "120px", marginBottom: "20px" }}
      />
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#333" }}>
        Welcome to EXCELR Healthcare
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
        Select your portal to continue:
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "220px",
        }}
      >
        <button
          onClick={() => navigate("/admin/admin-login")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Admin Portal
        </button>

        <button
          onClick={() => navigate("/doctor/doctor-login")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Doctor Portal
        </button>

        <button
          onClick={() => navigate("/patient/patient-login")}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#ffc107",
            color: "black",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Patient Portal
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
