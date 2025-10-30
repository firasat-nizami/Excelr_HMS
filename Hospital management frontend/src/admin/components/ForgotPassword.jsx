import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    // Simulate async password reset
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset link has been sent to your email!");
      navigateTo("/admin-login");
    }, 800);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container form-component">
        <img src="/admin/logo.png" alt="EXCELR" className="logo" />
        <h1 className="form-title">Forgot Password</h1>
        <p>Enter your registered email to reset your password.</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button type="submit">Send Reset Link</button>
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
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
