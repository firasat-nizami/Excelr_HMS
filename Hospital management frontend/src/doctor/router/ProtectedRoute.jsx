import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // true if logged in
  return isLoggedIn ? children : <Navigate to="/doctor/login" replace />;
}
