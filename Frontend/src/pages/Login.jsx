import React, { useState, useRef } from 'react';
import '../styles/Login.css';
import loginMoney from '../assets/login_money.svg';
import eyeIcon from '../assets/password_eye.svg';
import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('customer');
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Connects to Backend server  Auth Routes
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const endpoint = 'login';

    if (userType === "admin")
      endpoint = 'login/admin';

    const res = await fetch(`${API_URL}auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password: password,
        accountNumber: accountNumber
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("✅ Login successful:");
      // Store email for MFA verification
      localStorage.setItem("email", username);
      // Redirect to MFA page
      navigate("/mfa");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }
};

  // Prevent multiple rapid clicks on login button
  const [disabled, setDisabled] = useState(false);
  const lastClickRef = useRef(0);

  const handleSubmit = (e) => {
    const now = Date.now();
    if (now - lastClickRef.current < 4400) {
      console.log("⏳ Ignored rapid click");
      e.preventDefault();
      return;
    }

    lastClickRef.current = now;
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 4400);

    handleLogin(e);
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <img src={logo} alt="Totally Secure Logo" className="logo" />
        <h1>Totally $ecure</h1>
      </header>

      {/* Fullscreen Panels */}
      <div className="login-panels">
        {/* Left Panel */}
        <div className="left-panel">
          <h2>Login to Totally $ecure</h2>
            <p>Enter your login information to proceed.</p>

        {/* Falling money overlay */}
        <div className="falling-money">
            {[...Array(40)].map((_, i) => (
            <div
                key={i}
                className="money"
                style={{
                left: `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
                '--fall-duration': `${6 + Math.random() * 5}s`,
                '--sway-spin-duration': `${3 + Math.random() * 3}s`,
                '--size': `${40 + Math.random() * 40}px`
                }}
            >
                <img src={loginMoney} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="user-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${userType === 'customer' ? 'active' : ''}`}
              onClick={() => setUserType('customer')}
            >
              User
            </button>
            <button
              type="button"
              className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
              onClick={() => setUserType('admin')}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={eyeIcon}
                  alt="Toggle password visibility"
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={disabled}>
              {disabled ? "Please wait..." : "Login"}
            </button>
          </form>

          <p className="register-link">
            Don’t have an account? <Link to="/register">Register.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
