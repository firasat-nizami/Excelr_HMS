import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/patient/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/patient/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/patient/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/patient/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/patient/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/patient/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/patient/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/patient/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/patient/departments/ent.jpg" },
  ];

  const responsive = {
    extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4 },
    large: { breakpoint: { max: 1324, min: 1005 }, items: 3 },
    medium: { breakpoint: { max: 1005, min: 700 }, items: 2 },
    small: { breakpoint: { max: 700, min: 0 }, items: 1 },
  };

  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel responsive={responsive}>
        {departmentsArray.map((depart, index) => (
          <div className="card" key={index}>
            <div className="depart-name">{depart.name}</div>
            <img src={depart.imageUrl} alt={depart.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
