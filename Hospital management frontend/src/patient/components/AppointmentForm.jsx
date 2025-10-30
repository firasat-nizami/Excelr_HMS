import React, { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  // Fake doctors list instead of fetching from backend
  const doctors = [
    { firstName: "John", lastName: "Doe", doctrDptmnt: "Pediatrics" },
    { firstName: "Sarah", lastName: "Smith", doctrDptmnt: "Cardiology" },
    { firstName: "Raj", lastName: "Patel", doctrDptmnt: "Orthopedics" },
  ];

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

  const handleAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      firstName,
      lastName,
      email,
      phone,
      aadhar,
      dob,
      gender,
      appointmentDate,
      department,
      doctorFirstName,
      doctorLastName,
      hasVisited,
      address,
    };

    // Save appointments locally in browser
    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, newAppointment])
    );

    toast.success("Appointment saved successfully (offline)!");

    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAadhar("");
    setDob("");
    setGender("");
    setAppointmentDate("");
    setDepartment("Pediatrics");
    setDoctorFirstName("");
    setDoctorLastName("");
    setHasVisited(false);
    setAddress("");
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [fName, lName] = e.target.value.split(" ");
              setDoctorFirstName(fName);
              setDoctorLastName(lName || "");
            }}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctrDptmnt === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="5"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
        </div>

        <button type="submit">Get Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
