import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      // Optional: store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      navigate("/"); // ✅ redirect to Home
    } catch (error) {
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Study Cafe</h2>
      <div className="login-form">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
