import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./loading";
import { Context } from "../main.js";

const Register = () => {
  const { setIsAuthenticated } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    // Simulate async registration
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful!");
      setIsAuthenticated(false); // 👈 Changed from true to false
      navigateTo("/admin-login"); // 👈 Redirects to admin login instead of dashboard
    }, 1000);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container form-component">
        <img src="/admin/logo.png" alt="EXCELR" className="logo" />
        <h1 className="form-title">Create Your Account</h1>
        <p>Join EXCELR to manage your appointments and stay connected.</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button type="submit">Register</button>
          </div>

          <div
            style={{
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigateTo("/admin-login")}
            >
              Already have an account? Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
