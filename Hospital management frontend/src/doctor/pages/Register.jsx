import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { fullName, email, password };
    localStorage.setItem("doctorUser", JSON.stringify(newUser));
    alert("Registration successful! Please log in.");
    navigate("/doctor/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-logo"></div>
        <h2>Doctor Registration</h2>
        <p>Create your hospital dashboard account</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>
        <div className="auth-switch">
          Already have an account?
          <Link to="/doctor/login"> Login</Link>
        </div>
      </div>
    </div>
  );
}
