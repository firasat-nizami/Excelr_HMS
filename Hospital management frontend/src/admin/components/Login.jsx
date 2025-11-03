import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Loading from "./loading";
import { toast } from "react-toastify";
import api from "../../api"; // adjust relative path if your folder structure differs
import { AuthContext } from "../../context/AuthContext.jsx";


const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();

  // Determine portal type based on route
  const getPortalType = () => {
    if (location.pathname.includes("/admin")) return "Admin";
    if (location.pathname.includes("/doctor")) return "Doctor";
    if (location.pathname.includes("/patient")) return "Patient";
    return "User";
  };

  const portalType = getPortalType();

  // if already logged in, redirect to appropriate dashboard
  if (user) {
    if (portalType === "Admin" && user.role === "ROLE_ADMIN") return <Navigate to="/admin/dashboard" />;
    if (portalType === "Doctor" && user.role === "ROLE_DOCTOR") return <Navigate to="/doctor" />;
    if (portalType === "Patient" && user.role === "ROLE_PATIENT") return <Navigate to="/patient" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", {
        username: email,
        password: password,
      });

      // setUser in context (backend returns user object without password)
      setUser(res.data);

      toast.success(`${portalType} login successful!`);

      // redirect according to role
      if (res.data.role === "ROLE_ADMIN") navigateTo("/admin/dashboard");
      else if (res.data.role === "ROLE_DOCTOR") navigateTo("/doctor");
      else if (res.data.role === "ROLE_PATIENT") navigateTo("/patient");
      else navigateTo("/");

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="container form-component">
        <img src="/admin/logo.png" alt="EXCELR" className="logo" />
        <h1 className="form-title">{portalType} Login</h1>
        <p>Welcome to the {portalType} Portal of EXCELR Hospital</p>

        <form onSubmit={handleLogin}>
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

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>

          <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              type="button"
              style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
              onClick={() =>
                navigateTo(
                  portalType === "Admin" ? "/admin/register" : portalType === "Doctor" ? "/doctor/register" : "/patient/register"
                )
              }
            >
              Register Now
            </button>

            <button
              type="button"
              style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigateTo("/admin/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

// const Login = () => {
//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigateTo = useNavigate();
//   const location = useLocation();

//   // ✅ Determine portal type based on route
//   const getPortalType = () => {
//     if (location.pathname.includes("admin")) return "Admin";
//     if (location.pathname.includes("doctor")) return "Doctor";
//     if (location.pathname.includes("patient")) return "Patient";
//     return "User"; // Default fallback
//   };

//   const portalType = getPortalType();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate async login
//     setTimeout(() => {
//       toast.success(`${portalType} login successful!`);
//       setIsAuthenticated(true);
//       setLoading(false);

//       // ✅ Redirect to respective dashboard instead of landing page
//       if (portalType === "Admin") navigateTo("/admin/dashboard");
//       else if (portalType === "Doctor") navigateTo("/doctor");
//       else if (portalType === "Patient") navigateTo("/patient");
//       else navigateTo("/admin/dashboard");
//     }, 500);
//   };

//   // ✅ Redirect to the correct dashboard if already logged in
//   if (isAuthenticated) {
//     if (portalType === "Admin") return <Navigate to="/admin/dashboard" />;
//     if (portalType === "Doctor") return <Navigate to="/doctor" />;
//     if (portalType === "Patient") return <Navigate to="/patient" />;
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return (
//     <>
//       {loading && <Loading />}
//       <div className="container form-component">
//         <img src="/admin/logo.png" alt="EXCELR" className="logo" />
//         <h1 className="form-title">{portalType} Login</h1>
//         <p>Welcome to the {portalType} Portal of EXCELR Hospital</p>

//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <button type="submit">Login</button>
//           </div>

//           {/* Register & Forgot Password buttons */}
//           <div
//             style={{
//               marginTop: "15px",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <button
//               type="button"
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#007bff",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//               onClick={() =>
//                 navigateTo(
//                   portalType === "Admin"
//                     ? "/admin/register"
//                     : portalType === "Doctor"
//                     ? "/doctor/register"
//                     : "/patient/register"
//                 )
//               }
//             >
//               Register Now
//             </button>

//             <button
//               type="button"
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#007bff",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//               onClick={() => navigateTo("/admin/forgot-password")}
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
