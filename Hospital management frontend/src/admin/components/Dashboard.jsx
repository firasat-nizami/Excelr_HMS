import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import { Navigate } from "react-router-dom";
import Loading from "./loading";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [loading, setLoading] = useState(false);

  // Mock appointments data
  const [appointments, setAppointments] = useState([
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      appointment_date: "2025-10-05",
      doctor: { firstName: "Alice", lastName: "Smith" },
      department: "Cardiology",
      status: "Pending",
      hasVisited: false,
    },
    {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      appointment_date: "2025-10-06",
      doctor: { firstName: "Bob", lastName: "Johnson" },
      department: "Neurology",
      status: "Accepted",
      hasVisited: true,
    },
  ]);

  // Update status locally
  const updateStatus = (appointmentId, status) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, status }
          : appointment
      )
    );
    toast.success(`Status updated to ${status}`);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {loading && <Loading />}
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/admin/doc.png" alt="Admin" />
            <div className="content">
              <div>
                <p>Hello, </p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>
                The Excelr Administration panel allows admins to add new
                administrators, register doctors, and manage patient appointments.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Departments</p>
            <ul>
              <li>Pediatrics, Orthopedics</li>
              <li>Cardiology, Neurology</li>
              <li>Oncology, Radiology</li>
              <li>Physical Therapy, Dermatology</li>
              <li>ENT</li>
            </ul>
          </div>
        </div>

        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Rejected"
                            ? "value-rejected"
                            : "value-accepted"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          updateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option className="value-pending" value="Pending">
                          Pending
                        </option>
                        <option className="value-accepted" value="Accepted">
                          Accepted
                        </option>
                        <option className="value-rejected" value="Rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Appointments</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
