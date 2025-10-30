import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Appointment from './pages/Appointment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/loading';

export default function PatientRoutes() {
  const [loading] = useState(false);

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}


