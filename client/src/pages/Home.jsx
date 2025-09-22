import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bugs");
      setBugs(res.data);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching bugs:", err.response?.data || err.message);
      setError("Failed to load bugs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bug?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== id));
    } catch (err) {
      console.error("❌ Error deleting bug:", err.response?.data || err.message);
      alert("Failed to delete bug.");
    }
  };

  if (loading) return <p className="loading">Loading bugs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        background: "linear-gradient(to bottom right, #f9fafb, #eef2f7)",
      }}
    >
      <h2 className="home-title" style={{ textAlign: "center", marginBottom: "25px" }}>
        🐞 All Reported Bugs
      </h2>

      {bugs.length === 0 ? (
        <p className="empty-state">No bugs found. 🎉</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {bugs.map((bug) => (
            <div key={bug._id} className="bug-card">
              <h3 className="bug-title">{bug.title}</h3>
              <p className="bug-description">{bug.description}</p>

              <span className={`status-badge status-${bug.status}`}>
                {bug.status}
              </span>

              <small className="created-at">
                Created: {new Date(bug.createdAt).toLocaleString()}
              </small>

              <div className="actions">
                <button
                  className="action-btn"
                  onClick={() => navigate(`/edit/${bug._id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="action-btn action-delete"
                  onClick={() => handleDelete(bug._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
