import React, { useState, useRef } from 'react';
import '../styles/Login.css';
import loginMoney from '../assets/login_money.svg';
import eyeIcon from '../assets/password_eye.svg';
import logo from '../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { sanitize, validateFields } from '../utils/validators';

const Login = () => {
  const [userType, setUserType] = useState('customer');
  const [username, setUsername] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Prevent multiple rapid clicks
  const [disabled, setDisabled] = useState(false);
  const lastClickRef = useRef(0);

  // --- Submit handler with validation + sanitization (OWASP allow-list) ---
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: sanitize.text(username),
      accountNumber: sanitize.digits(accountNumber),
      password, // do not over-sanitize passwords; just validate strength on register
    };

    const v = validateFields({
      email: payload.email,
      accountNumber: payload.accountNumber,
      // password: payload.password  // optional on login
    });
    if (!v.ok) return alert(v.message);

    try {
      const res = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Login successful:");
        localStorage.setItem("email", payload.email);
        navigate("/mfa");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Server error");
    }
  };

  const handleSubmit = (e) => {
    const now = Date.now();
    if (now - lastClickRef.current < 4400) {
      e.preventDefault();
      return;
    }
    lastClickRef.current = now;
    setDisabled(true);
    setTimeout(() => setDisabled(false), 4400);
    handleLogin(e);
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="Totally Secure Logo" className="logo" />
        <h1>Totally $ecure</h1>
      </header>

      <div className="login-panels">
        <div className="left-panel">
          <h2>Login to Totally $ecure</h2>
          <p>Enter your login information to proceed.</p>

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

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                type="email"
                id="username"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(sanitize.text(e.target.value))}
                autoComplete="username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                placeholder="9-12 digits"
                value={accountNumber}
                onChange={(e) => setAccountNumber(sanitize.digits(e.target.value).slice(0, 10))}
                inputMode="numeric"
                pattern="\d{9,12}"                
                title="Account number must be exactly 9-12 digits"
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
                  autoComplete="current-password"
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
