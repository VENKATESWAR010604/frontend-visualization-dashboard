import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin");

  // ✅ When Admin text clicked
  const handleAdminClick = () => {
    setEmail("admin@demo.com");
    setPassword("admin");

    // direct dashboard open
    setTimeout(() => {
      navigate("/Dashboard");
    }, 300);
  };

  // ✅ Login button click
  const handleLogin = () => {
    if (email === "admin@demo.com" && password === "admin") {
      navigate("/Dashboard");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE IMAGE AREA */}
      <div className="left-panel">
        <h1 className="brand">DASHBOARD</h1>

        <div className="stats-card profit">
          <p>Profit</p>
          <h3>624k</h3>
        </div>

        <div className="avatar">👨‍💼</div>

        <div className="stats-card order">
          <p>Orders</p>
          <h3>124k</h3>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="right-panel">
        <div className="login-card">
          <h2>Welcome to DashBoard! 👋</h2>

          <div className="demo-box">
            <p>
              <b
                style={{ cursor: "pointer", color: "blue" }}
                onClick={handleAdminClick}
              >
                Admin:
              </b>{" "}
              admin@demo.com / admin
            </p>

            <p>
              <b>Client:</b> client@demo.com / client
            </p>
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaGithub />
            <FaGoogle />
          </div>
        </div>
      </div>
    </div>
  );
}
