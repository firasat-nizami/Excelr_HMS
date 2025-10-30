import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./loading";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const addNewAdmin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async operation
    setTimeout(() => {
      toast.success(`Admin ${firstName} ${lastName} added successfully!`);
      setLoading(false);

      // Optionally clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setAadhar("");
      setGender("");
      setPassword("");

      // Navigate back to dashboard or homepage
      navigateTo("/");
    }, 500); // simulate 0.5s delay
  };

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <div className="container form-component add-admin-form">
        {/*<img src="/admin/logo.png" alt="Excelr" className="logo" />*/}
        <h1 className="form-title">Add New Admin</h1><br/><br/>

        <form onSubmit={addNewAdmin}>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>

          <div>
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
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Add New Admin</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewAdmin;
