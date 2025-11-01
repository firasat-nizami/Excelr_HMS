import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main.js";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    navigateTo("/login"); // Redirect to login page
  };

  // Login navigation
  const gotoLogin = () => {
    navigateTo("/patient/patient-login");
    setShow(!show);
  };

  // Navigate to Home after successful login (optional)
  if (isAuthenticated && window.location.pathname === "/patient/patient-login") {
    navigateTo("/patient");
  }

  return (
    <>
      <nav className="container">
        <div className="logo">
            <img
              src="/patient/logo.png"
            alt="logo"
            className="logo-img"
            onClick={() => navigateTo("/")}
          />
        </div>

        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {/* Show links based on login status */}
            {isAuthenticated ? (
              <>
                <Link to={"/"} onClick={() => setShow(!show)}>
                  Home
                </Link>
                <Link to={"/patient/appointment"} onClick={() => setShow(!show)}>
                  Appointment
                </Link>
              </>
            ) : (
              <Link to={"/patient/about"} onClick={() => setShow(!show)}>
                About Us
              </Link>
            )}
          </div>

          {/* Auth button */}
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="logoutBtn btn" onClick={gotoLogin}>
              Login
            </button>
          )}
        </div>

        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <GiHamburgerMenu /> : <AiOutlineClose />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
