import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './admin/AdminRoutes.jsx';
import PatientRoutes from './patient/PatientRoutes.jsx';
import DoctorRoutes from './doctor/DoctorRoutes.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/patient/*" element={<PatientRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}