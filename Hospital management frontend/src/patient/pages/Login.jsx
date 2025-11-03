import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../api";
import Loading from "../components/Loading"; // optional


const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(false);

  if (user && user.role === "ROLE_PATIENT") {
    return <Navigate to={"/patient"} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { username: email, password });
      setUser(res.data);
      toast.success("Logged in successfully!");
      navigateTo("/patient");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-component login-form">
      {loading && <Loading />}
      <h2>Login</h2>
      <p>Please login to continue</p>
      <p>Welcome to Excelr Hospital. Please manage appointments and stay connected with your healthcare provider.</p>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p>Not Registered?</p>
          <Link to={"/patient/register"}>Register Now</Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

// const Login = () => {
//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigateTo = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Simple local validation (optional)
//     if (!email || !password || !confirmPassword) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     // Simulate successful login
//     setIsAuthenticated(true);
//     toast.success("Logged in successfully!");
//     navigateTo("/patient");
//   };

//   if (isAuthenticated) {
//     return <Navigate to={"/patient"} />;
//   }

//   return (
//     <div className="container form-component login-form">
//       <h2>Login</h2>
//       <p>Please login to continue</p>
//       <p>
//         Welcome to Excelr Hospital. Please manage appointments and stay
//         connected with your healthcare provider. Your privacy and security are
//         our top priorities.
//       </p>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
      
//         {/* <div
//           style={{display:"flex",justifyContent:"flex-end"
            
//           }}
//         >
//           <p style={{ marginBottom: 0 }}>Not Registered?</p>
//           <Link
//             to={"/patient/register"}
//             style={{marginTop:"35px" }}
//           >
//             Register Now
//           </Link>
//         </div> */}

//         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//           <p>Not Registered?</p>
//           <Link  to={"/patient/register"}>Register Now</Link>
//         </div>
//         <div style={{ justifyContent: "center", alignItems: "center" }}>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
