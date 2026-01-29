import React from "react";
import "./AboutUs.css";
import Gallery from "../../Assets/Gallery.png";


const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="image-container">
        <img
          src={Gallery}
          alt="About Us"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
      <div className="about-us-text">
        <h2>ABOUT US</h2>
        <p>
          We are dedicated to creating the perfect environment for your
          productivity and relaxation. Whether you need a quiet space to focus
          or a cozy corner to unwind, Brew and Brain offers it all. Our mission
          is to provide a seamless balance between work and leisure, so you can
          be your most productive self without compromising comfort.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
