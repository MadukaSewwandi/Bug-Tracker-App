import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewBug.css";

export default function NewBug() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bugs", {
        title,
        description,
        status,
      });

      setError("");
      navigate("/");
    } catch (err) {
      console.error("❌ Error submitting bug:", err.response?.data || err.message);
      setError("Failed to submit bug. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>🐞 Report a New Bug</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="bug-form">
        <label>Bug Title</label>
        <input
          type="text"
          placeholder="Enter bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Bug Description</label>
        <textarea
          placeholder="Describe the bug"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
         

        </select>

        <button type="submit" className="submit-btn">
          ✅ Submit Bug
        </button>
      </form>
    </div>
  );
}
