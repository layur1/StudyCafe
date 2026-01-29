import React from "react";
import "./Hero.css";
import heroimage from "../../Assets/heroimage.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explorenow");
  };

  return (
    <div className="hero-image-container">
      <img
        className="hero-image"
        src={heroimage}
        alt="Cozy and creative study space"
      />

      <div className="hero-overlay" />

      <header className="hero-content">
        <h1 className="title">Brew & Brain</h1>

        <p className="description">
          At Brew and Brain, we believe in creating the perfect blend of
          productivity and relaxation. Whether you're studying, brainstorming,
          or simply enjoying a cup of coffee — this is your space.
        </p>

        <button onClick={handleExploreClick} className="button">
          Explore Now
        </button>
      </header>
    </div>
  );
};

export default Hero;
