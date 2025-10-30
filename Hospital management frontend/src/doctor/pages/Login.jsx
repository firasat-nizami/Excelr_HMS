import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("doctorUser"));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("doctorName", user.fullName);
      navigate("/doctor"); // redirect to dashboard
    } else {
      alert("Invalid credentials. Please register first.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo"></div>
        <h2>Doctor Login</h2>
        <p>Access your hospital dashboard</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <div className="auth-switch">
          Don’t have an account?
          <Link to="/doctor/register"> Register</Link>
        </div>
      </div>
    </div>
  );
}
