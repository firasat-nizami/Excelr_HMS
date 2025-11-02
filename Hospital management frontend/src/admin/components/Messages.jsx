import React, { useContext, useState } from "react";
import { Context } from "../main.js";
import Loading from "./loading";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(Context);

  // Mock local messages data
  const [messages] = useState([
    {
      _id: "1",
      firstName: "Radha",
      lastName: "varma",
      email: "radha@example.com",
      phone: "1234567890",
      message: "I need an appointment for next week.",
    },
    {
      _id: "2",
      firstName: "Vishal",
      lastName: "deo",
      email: "jane@example.com",
      phone: "9876543210",
      message: "Please schedule a follow-up visit.",
    },
  ]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages.length > 0 ? (
          messages.map((element) => (
            <div className="card" key={element._id}>
              <div className="details">
                <p>
                  First Name: <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName}</span>
                </p>
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  Message: <span>{element.message}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
