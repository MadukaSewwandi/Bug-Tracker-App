import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./Navbar.css";

export default function Navbar({ handleLogout }) {
  return (
    <header className="navbar">
      {/* Attractive logo-like heading */}
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          margin: 0,
        }}
      >
        🐞 <span>Bug Tracker</span>
      </h1>

      {/* ✅ Grouped links with spacing */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/new">Report Bug</Link>

        {/* 🔑 Logout button with left spacing */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
    </header>
  );
}
