import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../components/loading";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (!user) {
    // not logged in
    return <Navigate to="/doctor/login" replace />;
  }

  if (allowedRole && user.role && !user.role.includes(allowedRole)) {
    // role mismatch - redirect to their login or a "not authorized" page
    return <Navigate to={`/${user.role?.toLowerCase().replace("role_", "")}/login`} replace />;
  }

  return children;
}
