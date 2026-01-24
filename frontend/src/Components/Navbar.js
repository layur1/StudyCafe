// src/Components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <div className={`outer-div ${isScrolled ? "scrolled" : "transparent"}`}>
      <div className="inner-flex">
        <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div></div><div></div><div></div>
        </div>

        <div className={`text-container ${isMenuOpen ? "open" : ""}`}>
          {["Home", "Book", "Online Mode", "About Us"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className={`text-item ${selectedItem === item ? "selected" : ""}`}
              onClick={() => {
                setSelectedItem(item);
                setIsMenuOpen(false);
              }}
            >
              <div className="text-content">{item}</div>
            </Link>
          ))}

          <Link
            to="/sign-in"
            className={`text-item sign-btn ${selectedItem === "Sign In" ? "selected" : ""}`}
            onClick={() => { setSelectedItem("Sign In"); setIsMenuOpen(false); }}
          >
            <div className="text-content">Sign In</div>
          </Link>

          <Link
            to="/login"
            className={`text-item login-btn ${selectedItem === "Login" ? "selected" : ""}`}
            onClick={() => { setSelectedItem("Login"); setIsMenuOpen(false); }}
          >
            <div className="text-content">Login</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
