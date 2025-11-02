import React, { useEffect, useState, createContext } from "react";
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

export const AdminContext = createContext({ isAuthenticated: false });

export default function AdminRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
      setUser({});
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loading />;

  return (
    <AdminContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
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
    </AdminContext.Provider>
  );
}


