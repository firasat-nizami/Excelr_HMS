import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
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

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/admin/addnew");
    setShow(false);
  };

  // ✅ Updated Logout handler
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setIsAuthenticated(false);
    setShow(false); // ✅ Auto-close sidebar on logout
    navigateTo("/admin"); // ✅ Redirect to admin landing page
  };

  // ✅ Hide sidebar and hamburger before login
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <button className="icon-btn" aria-label="Home" onClick={gotoHome}>
            <TiHome />
          </button>
          <button className="icon-btn" aria-label="Doctors" onClick={gotoDoctors}>
            <FaUserDoctor />
          </button>
          <button className="icon-btn" aria-label="Add Admin" onClick={gotoAddNewAdmin}>
            <MdAddModerator />
          </button>
          <button className="icon-btn" aria-label="Add Doctor" onClick={gotoAddNewDoctor}>
            <IoPersonAddSharp />
          </button>
          <button className="icon-btn" aria-label="Messages" onClick={gotoMessages}>
            <AiFillMessage />
          </button>
          <button className="icon-btn" aria-label="Logout" onClick={handleLogout}>
            <RiLogoutBoxFill />
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
