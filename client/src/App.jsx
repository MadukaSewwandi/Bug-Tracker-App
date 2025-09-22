import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NewBug from "./pages/NewBug.jsx";
import EditBug from "./pages/EditBug.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import "./index.css"; // ✅ Import your global styles here


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Always start unauthenticated → Go to Register first
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/register"); // Redirect to register after logout
  };

  // Hide Navbar on register/login
  const hideNavbar =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {!hideNavbar && isAuthenticated && <Navbar handleLogout={handleLogout} />}

      {/* Full width & height page container */}
      <div style={{ flex: 1, width: "100%" }}>
        <Routes>
          {/* Default route: If not logged in → register page */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/register" replace />}
          />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/new"
            element={isAuthenticated ? <NewBug /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/edit/:id"
            element={isAuthenticated ? <EditBug /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}
