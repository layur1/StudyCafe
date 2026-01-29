import React, { useState, useEffect } from "react";
import "./Book.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

const Book = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studyArea: "",
    timeSpent: "",
    date: "",
    time: "",
  });

  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [isBackendReachable, setIsBackendReachable] = useState(null);

  /* ===========================
     Backend Health Check
     =========================== */
  useEffect(() => {
    const checkBackend = async () => {
      let attempts = 3;

      while (attempts > 0) {
        try {
          const res = await axios.get(`${API_URL}/health`, {
            timeout: 5000,
          });

          if (res.data?.status === "OK") {
            setIsBackendReachable(true);
            return;
          }
        } catch (err) {
          attempts -= 1;
          if (attempts === 0) {
            setIsBackendReachable(false);
            setError(
              "Cannot connect to server. Please try again later."
            );
          }
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    };

    checkBackend();
  }, []);

  /* ===========================
     Form Handling
     =========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===========================
     Price Calculation
     =========================== */
  useEffect(() => {
    if (formData.timeSpent) {
      setPrice(Number(formData.timeSpent) * 5);
    } else {
      setPrice(0);
    }
  }, [formData.timeSpent]);

  /* ===========================
     Submit Booking
     =========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isBackendReachable) {
      setError("Backend is not reachable.");
      return;
    }

    try {
      const payload = {
        ...formData,
        timeSpent: Number(formData.timeSpent),
      };

      const res = await axios.post(
        `${API_URL}/api/bookings`,
        payload,
        { timeout: 15000 }
      );

      alert(
        `Reservation successful!\nTotal Price: $${res.data.price}`
      );

      setFormData({
        name: "",
        email: "",
        studyArea: "",
        timeSpent: "",
        date: "",
        time: "",
      });
      setPrice(0);

      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Booking failed. Please try again.";

      setError(message);
    }
  };

  /* ===========================
     JSX
     =========================== */
  return (
    <div className="booking-container">
      <h1 className="booking-title">
        Reserve Your Spot at Brew and Brain
      </h1>

      {error && <div className="error-message">{error}</div>}

      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="booking-input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="booking-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="studyArea"
          className="booking-input"
          value={formData.studyArea}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Study Area
          </option>
          <option value="Bodleian Library">Bodleian Library</option>
          <option value="Secret">Secret</option>
          <option value="Hatchard">Hatchard</option>
          <option value="Group Study">Group Study</option>
          <option value="Oxford">Oxford</option>
          <option value="Imperial">Imperial</option>
          <option value="Laptop Zone">Laptop Zone</option>
        </select>

        <input
          type="number"
          name="timeSpent"
          placeholder="Time (hours)"
          className="booking-input"
          min="1"
          max="12"
          value={formData.timeSpent}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <input
            type="date"
            name="date"
            className="booking-input"
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            className="booking-input"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {price > 0 && (
          <div className="price-display">
            <p>Total Price: ${price}</p>
          </div>
        )}

        <button type="submit" className="booking-button">
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};

export default Book;
