import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { toast } from "react-toastify";

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctrDptmnt, setDoctrDptmnt] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [doctorsList, setDoctorsList] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();

  const addNewDoctor = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async action
    setTimeout(() => {
      const newDoctor = {
        firstName,
        lastName,
        email,
        phone,
        gender,
        doctrDptmnt,
        password,
        documentFileName: documentFile ? documentFile.name : "N/A",
      };

      setDoctorsList((prev) => [...prev, newDoctor]);
      toast.success(`Doctor ${firstName} ${lastName} added successfully!`);
      setLoading(false);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGender("");
      setPassword("");
      setDoctrDptmnt("");
  setDocumentFile(null);
      

      navigateTo("/dashboard");
    }, 500);
  };

  if (loading) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <section className="page">
      <div className="container form-component add-doctor-form">
        <h1 className="form-title">Register a New Doctor</h1>
        <br />
        <br />

        <form onSubmit={addNewDoctor}>
          <div className="first-wrapper">
            <div>
              {/* Left placeholder to preserve layout where the doctor avatar used to be */}
              <div className="avatar-placeholder" style={{ height: 515 }}></div>
            </div>
            <div className="form-fields">
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              value={phone}
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>


            <select
              value={doctrDptmnt}
              onChange={(e) => setDoctrDptmnt(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departmentsArray.map((dept, idx) => (
                <option value={dept} key={idx}>
                  {dept}
                </option>
              ))}
            </select>

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Removed Aadhar/DOB and document upload as requested */}

            <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;

