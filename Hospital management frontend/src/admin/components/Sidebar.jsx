import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/admin/dashboard");
    setShow(false);
  };

  const gotoDoctors = () => {
    navigateTo("/admin/doctors");
    setShow(false);
  };

  const gotoMessages = () => {
    navigateTo("/admin/messages");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/admin/doctor/addnew");
    setShow(false);
  };

  // ✅ Logout handler
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setIsAuthenticated(false);
    setShow(false);
    navigateTo("/admin");
  };

  // ✅ Hide sidebar when not logged in
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <button onClick={gotoHome}>
            <TiHome /> <span>Home</span>
          </button>
          <button onClick={gotoDoctors}>
            <FaUserDoctor /> <span>Doctors</span>
          </button>
          <button onClick={gotoAddNewDoctor}>
            <IoPersonAddSharp /> <span>Add Doctor</span>
          </button>
          <button onClick={gotoMessages}>
            <AiFillMessage /> <span>Messages</span>
          </button>
          <button onClick={handleLogout}>
            <RiLogoutBoxFill /> <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="wrapper">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShow(!show)}
        />
      </div>
    </>
  );
};

export default Sidebar;
