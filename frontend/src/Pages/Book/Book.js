import React, { useState, useEffect } from 'react';
import './Book.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studyArea: '',
    timeSpent: '',
    date: '',
    time: '',
  });
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [isBackendReachable, setIsBackendReachable] = useState(null);

  // Check if backend is reachable on component mount with retry logic
  useEffect(() => {
    const checkBackend = async () => {
      let attempts = 3;
      while (attempts > 0) {
        try {
          const response = await axios.get('/health', { timeout: 5000 }); // Adjusted to /health
          if (response.data.status === 'OK') {
            setIsBackendReachable(true);
            console.log('Backend is reachable');
            return;
          }
        } catch (err) {
          console.error(`Backend not reachable (attempt ${4 - attempts}):`, err.message);
          attempts -= 1;
          if (attempts === 0) {
            setIsBackendReachable(false);
            setError('Cannot connect to the server. Please ensure the backend is running.');
          }
          await new Promise(res => setTimeout(res, 2000)); // Wait 2 seconds before retrying
        }
      }
    };
    checkBackend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData.timeSpent) {
      const calculatedPrice = parseInt(formData.timeSpent) * 5 || 0;
      setPrice(calculatedPrice);
    } else {
      setPrice(0);
    }
  }, [formData.timeSpent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('Form data before submission:', formData);

    if (!isBackendReachable) {
      setError('Cannot connect to the server. Please ensure the backend is running.');
      return;
    }

    try {
      const bookingData = { 
        ...formData, 
        timeSpent: parseInt(formData.timeSpent) || 0,
      };
      console.log('Sending to backend:', bookingData);

      const response = await axios.post('/api/bookings', bookingData, {
        timeout: 30000,
      });

      console.log('Backend response:', response.data);
      alert(`Reservation Submitted! Total Price: $${response.data.price}`);
      setFormData({
        name: '',
        email: '',
        studyArea: '',
        timeSpent: '',
        date: '',
        time: '',
      });
      setPrice(0);
      navigate('/');
    } catch (err) {
      console.error('Submission error:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
        } : 'No response from server',
      });
      const errorMessage = err.response?.data?.error || err.message || 'Network error. Please ensure the server is running.';
      setError(errorMessage);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Reserve Your Spot at Brew and Brain</h1>
      {error && <div className="error-message">{error}</div>}
      {isBackendReachable === false && (
        <div className="error-message">Backend server is not reachable. Please start the server.</div>
      )}
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
          <option value="" disabled>Select Study Area</option>
          <option value="Area1">BODLEIAN LIBRARY</option>
          <option value="Area2">SECRET</option>
          <option value="Area3">HATCHARD</option>
          <option value="Area4">GROUP STUDY</option>
          <option value="Area5">OXFORD</option>
          <option value="Area6">IMPERIAL</option>
          <option value="Area7">LAPTOP ZONE</option>
        </select>
        <input
          type="number"
          name="timeSpent"
          placeholder="Time (hours)"
          className="booking-input"
          value={formData.timeSpent}
          onChange={handleChange}
          min="1"
          max="12"
          required
        />
        <div className="form-group">
          <input
            type="date"
            name="date"
            className="booking-input"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
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
        <button type="submit" className="booking-button">Confirm Reservation</button>
      </form>
    </div>
  );
};

export default Book;