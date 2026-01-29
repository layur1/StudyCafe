import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import facebook from "../../Assets/facebook.png";
import twitter from "../../Assets/twitter.png";
import instagram from "../../Assets/instagram.png";
import youtube from "../../Assets/youtube.png";
import telegram from "../../Assets/telegram.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">

          {/* Logo & Tagline */}
          <div className="footer-logo">
            <h2>Brew & Brain</h2>
            <p>Where you can do anything or just do nothing.</p>
          </div>

          {/* Contact Information */}
          <div className="footer-address">
            <h3>Contact</h3>
            <p>123 Coffee Street, Colombo, Sri Lanka</p>
            <p>
              Email:{" "}
              <a href="mailto:contact@brewandbrain.com">
                contact@brewandbrain.com
              </a>
            </p>
            <p>Phone: +94 123 456 789</p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/online-mode">Online Mode</Link></li>
              <li><Link to="/book">Book a Seat</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="footer-socials">
            <h3>Follow Us</h3>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src={facebook} alt="Facebook" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <img src={twitter} alt="Twitter" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={instagram} alt="Instagram" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <img src={youtube} alt="YouTube" />
            </a>

            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <img src={telegram} alt="Telegram" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {currentYear} Brew & Brain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
