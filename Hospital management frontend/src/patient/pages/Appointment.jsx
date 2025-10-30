import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";
import Hero from "../components/Hero";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Get the Best Care Possible: Book an Appointment at Excelr Hospital"}
        imageUrl={"/patient/signin.png"}
      />
      <AppointmentForm />
      <AppointmentList />
    </>
  );
};

export default Appointment;
