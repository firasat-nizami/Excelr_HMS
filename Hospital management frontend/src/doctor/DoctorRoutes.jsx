import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import Messages from './components/Messages';
import Reports from './components/Reports';
import Settings from './components/Settings';
import patientsData from './data/patients';
import appointmentsData from './data/appointments';
import reportsData from './data/reports';
import messagesData from './data/messages';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './router/ProtectedRoute';

export default function DoctorRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="app-layout">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route index element={<Dashboard appointments={appointmentsData} />} />
                  <Route path="patients" element={<Patients initialPatients={patientsData} />} />
                  <Route path="appointments" element={<Appointments initialAppointments={appointmentsData} />} />
                  <Route path="messages" element={<Messages initialMessages={messagesData} />} />
                  <Route path="reports" element={<Reports initialReports={reportsData} />} />
                  <Route path="settings" element={<Settings initialProfile={{ name: 'Dr. John Doe', email: '', phone: '', specialization: '' }} />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      <Route path="*"
  element={
    <ProtectedRoute allowedRole="ROLE_DOCTOR">
      <div className="app-layout"> ... </div>
    </ProtectedRoute>
  } />
    </Routes>
  );
}


