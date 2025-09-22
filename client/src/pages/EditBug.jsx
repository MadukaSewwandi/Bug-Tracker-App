import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./NewBug.css"; // reuse the form styles

export default function EditBug() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bugs`);
        const bug = res.data.find((b) => b._id === id);
        if (bug) {
          setTitle(bug.title);
          setDescription(bug.description);
          setStatus(bug.status);
        }
      } catch (err) {
        console.error("❌ Error loading bug:", err.response?.data || err.message);
        setError("Failed to load bug data.");
      }
    };

    fetchBug();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/bugs/${id}`, {
        title,
        description,
        status,
      });
      navigate("/");
    } catch (err) {
      console.error("❌ Error updating bug:", err.response?.data || err.message);
      setError("Failed to update bug.");
    }
  };

  return (
    <div className="form-container">
      <h2>✏️ Edit Bug</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleUpdate} className="bug-form">
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
          ✅ Update Bug
        </button>
      </form>
    </div>
  );
}
