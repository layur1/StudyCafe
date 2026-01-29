import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSignIn = async () => {
    try {
      await axios.post(`${API_URL}/register`, {
        username,
        password,
      });

      alert("Signed in successfully!");
      navigate("/login"); // ✅ go to login page
    } catch (error) {
      alert(
        "Sign In failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In to Study Cafe</h2>
      <div className="sign-in-form">
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
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}

export default SignIn;
