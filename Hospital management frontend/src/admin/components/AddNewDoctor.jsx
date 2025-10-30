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
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctrDptmnt, setDoctrDptmnt] = useState("");
  const [doctrAvatar, setDoctrAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
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

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setDoctrAvatar(reader.result); // store base64 locally
    };
  };

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
        aadhar,
        gender,
        dob,
        doctrDptmnt,
        password,
        avatar: doctrAvatar,
      };

      setDoctorsList((prev) => [...prev, newDoctor]);
      toast.success(`Doctor ${firstName} ${lastName} added successfully!`);
      setLoading(false);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setAadhar("");
      setGender("");
      setPassword("");
      setDoctrDptmnt("");
      setDoctrAvatar("");
      setAvatarPreview("");

      navigateTo("/"); // redirect to dashboard/homepage
    }, 500);
  };

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page">
      <div className="container form-component add-doctor-form">
        {/*<img src="/logo.png" alt="Excelr" className="logo" />*/}
        <h1 className="form-title">Register a new Doctor</h1><br /><br />

        <form onSubmit={addNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={avatarPreview || "/admin/docHolder.jpg"}
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
            </div>

            <div>
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
              />
              <input
                type="number"
                value={aadhar}
                placeholder="Aadhar Number"
                onChange={(e) => setAadhar(e.target.value)}
              />
              <input
                type="date"
                value={dob}
                placeholder="Date of Birth"
                onChange={(e) => setDob(e.target.value)}
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
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctrDptmnt}
                onChange={(e) => setDoctrDptmnt(e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((dept, idx) => (
                  <option value={dept} key={idx}>
                    {dept}
                  </option>
                ))}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
