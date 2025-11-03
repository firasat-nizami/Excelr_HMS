import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import AddNewDoctor from "./components/AddNewDoctor";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/loading";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { AuthContext } from "../context/AuthContext";
import React, { useContext } from "react";

export default function AdminRoutes() {
  const { user, loading } = useContext(AuthContext);
  const isAuthenticated = !!user && user.role === "ROLE_ADMIN";

  if (loading) return <Loading />;

  return (
    <>
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="admin-login" element={<Login />} />
        <Route path="doctor-login" element={<Login />} />
        <Route path="patient-login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register" element={<Register />} />
        <Route path="doctor/addnew" element={<AddNewDoctor />} />
        <Route path="messages" element={<Messages />} />
        <Route path="doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}


