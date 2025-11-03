import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Patients from "../components/Patients";
import Appointments from "../components/Appointments";
import Messages from "../components/Messages";
import Reports from "../components/Reports";
import Settings from "../components/Settings";
import patientsData from "../data/patients";
import appointmentsData from "../data/appointments";
import reportsData from "../data/reports";
import messagesData from "../data/messages";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Layout() {
  const { user } = useContext(AuthContext);
  const name = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "Dr. John Doe";

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard appointments={appointmentsData} />} />
          <Route path="/patients" element={<Patients initialPatients={patientsData} />} />
          <Route path="/appointments" element={<Appointments initialAppointments={appointmentsData} />} />
          <Route path="/messages" element={<Messages initialMessages={messagesData} />} />
          <Route path="/reports" element={<Reports initialReports={reportsData} />} />
          <Route
            path="/settings"
            element={
              <Settings
                initialProfile={{
                  name,
                  email: user?.username || "",
                  phone: user?.phone || "",
                  specialization: user?.specialization || "",
                }}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
