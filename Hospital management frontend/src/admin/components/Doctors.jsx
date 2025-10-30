import React, { useContext, useState } from "react";
import { Context } from "../main";
import Loading from "./loading";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(Context);

  // Mock local doctors data
  const [doctors] = useState([
    {
      firstName: "LIKHITH",
      lastName: "BADIGA",
      email: "likhithbadiga@gmail.com",
      phone: "1234567890",
      dob: "1980-05-10",
      doctrDptmnt: "Cardiology",
      aadhar: "111122223333",
      gender: "male",
      doctrAvatar: "/admin/docHolder.jpg",
    },
    {
      firstName: "hello world",
      lastName: "how are you",
      email: "hello@gmail.com",
      phone: "9876543210",
      dob: "1975-11-20",
      doctrDptmnt: "Neurology",
      aadhar: "444455556666",
      gender: "Male",
      doctrAvatar: "/admin/docHolder.jpg",
    },
  ]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page doctors">
      <h1>Doctors</h1>
      <div className="banner">
        {doctors.length > 0 ? (
          doctors.map((element, index) => (
            <div className="card" key={index}>
              <img
                src={element.doctrAvatar || "/admin/docHolder.jpg"}
                alt="Doctor Avatar"
              />
              <h4>{`${element.firstName} ${element.lastName}`}</h4>
              <div className="details">
                <p>
                  Email:<span>{element.email}</span>
                </p>
                <p>
                  Phone:<span>{element.phone}</span>
                </p>
                <p>
                  DoB:<span>{element.dob}</span>
                </p>
                <p>
                  Department:<span>{element.doctrDptmnt}</span>
                </p>
                <p>
                  Aadhar:<span>{element.aadhar}</span>
                </p>
                <p>
                  Gender:<span>{element.gender}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
