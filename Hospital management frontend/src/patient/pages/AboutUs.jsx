import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | EXCELR Hospital "}
        imageUrl={"/patient/about.png"}
      />
      <Biography imageUrl={"/patient/whoweare.png"}/>
    </>
  );
};

export default AboutUs;
