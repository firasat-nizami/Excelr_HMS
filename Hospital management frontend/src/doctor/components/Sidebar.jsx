import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const doctorName = localStorage.getItem("doctorName") || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("doctorName");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h3>👨‍⚕️ {doctorName}</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/appointments">Appointments</NavLink>
          </li>
          <li>
            <NavLink to="/messages">Messages</NavLink>
          </li>
          <li>
            <NavLink to="/reports">Reports</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
