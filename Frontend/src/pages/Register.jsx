import React, { useState, useRef } from 'react';
import '../styles/Login.css'; 
import loginMoney from '../assets/login_money.svg';
import logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    idNumber: '',
    accountNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Connects to Backend server  Auth Routes
  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        username: `${formData.firstName} ${formData.surname}`,
        firstName: formData.firstName,
        lastName: formData.surname,
        idNumber: formData.idNumber,
        accountNumber: formData.accountNumber,
        password: formData.password
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Registration successful!");
      console.log(data);
      // Redirect to login
      navigate("/login");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Error registering:", err);
  }
};

// Prevent multiple rapid clicks on Register button
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

    handleRegister(e);
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="Totally Secure Logo" className="logo" />
        <h1>Totally $ecure</h1>
      </header>

      <div className="login-panels">
        {/* Left Panel */}
        <div className="left-panel">
          <h2>Register for Totally $ecure</h2>
          <p>Enter the required information in all fields to complete your registration.</p>
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
          <form onSubmit={handleSubmit}>
              <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Enter surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />  
             </div>

            <div className="input-group">
              <label htmlFor="idNumber">ID Number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder="Enter ID number"
                value={formData.idNumber}
                onChange={handleChange}
                required
                pattern="\d{13}"
                title="Account number must be exactly 13 digits"
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                pattern="\d{10}"
                title="Account number must be exactly 10 digits"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Enter password again"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={disabled}>
              {disabled ? "Please wait..." : "Register"}
            </button>
          </form>

          <p className="register-link">
            Already have an account?  <Link to="/login">Login.</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
