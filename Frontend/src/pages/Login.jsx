import React, { useState } from 'react';
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

  // Connects to Backend server  Auth Routes
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://localhost:4040/totallysecure/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username, // or use a separate email field
        password: password
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("✅ Login successful:", data);
      localStorage.setItem("token", data.token); // Save JWT
      // Redirect to dashboard or protected route
      navigate("/userdashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }
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

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
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

            <button type="submit" className="login-btn">
              Login
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
