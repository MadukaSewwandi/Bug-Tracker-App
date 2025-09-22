import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Register({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("QA");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      // ✅ Automatically log in user after successful registration
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // persist login
      navigate("/"); // go to home page
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>📝 Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="QA">QA</option>
            <option value="Developer">Developer</option>
            <option value="Admin">Admin</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button type="submit" className="submit-btn">
            ✅ Register
          </button>
        </form>
        <p className="switch-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
