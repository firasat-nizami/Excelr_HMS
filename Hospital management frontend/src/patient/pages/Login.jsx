import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple local validation (optional)
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Simulate successful login
    setIsAuthenticated(true);
    toast.success("Logged in successfully!");
    navigateTo("/patient");
  };

  if (isAuthenticated) {
    return <Navigate to={"/patient"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Login</h2>
      <p>Please login to continue</p>
      <p>
        Welcome to Excelr Hospital. Please manage appointments and stay
        connected with your healthcare provider. Your privacy and security are
        our top priorities.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link
            to={"/patient/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
