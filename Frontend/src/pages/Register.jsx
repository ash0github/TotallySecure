import React, { useState, useRef } from 'react';
import '../styles/Login.css';
import loginMoney from '../assets/login_money.svg';
import logo from '../assets/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { sanitize, validateFields, re } from '../utils/validators';

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

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const setField = (name, value) => {
    let v = value;

    if (name === 'firstName' || name === 'surname') v = sanitize.text(v);
    if (name === 'idNumber') v = sanitize.digits(v).slice(0, 13);
    if (name === 'accountNumber') v = sanitize.digits(v).slice(0, 12);
    if (name === 'email') v = sanitize.text(v);
    if (name === "accountNumber") v = sanitize.digits(v).slice(0, 12);

    setFormData((prev) => ({ ...prev, [name]: v }));
  };

  // Prevent rapid resubmits
  const [disabled, setDisabled] = useState(false);
  const lastClickRef = useRef(0);

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      username: `${formData.firstName} ${formData.surname}`.replace(/\s+/g, ' ').trim(),
      firstName: formData.firstName,
      lastName: formData.surname,
      idNumber: formData.idNumber,
      accountNumber: formData.accountNumber,
      password: formData.password
    };

    const v = validateFields({
      email: payload.email,
      firstName: payload.firstName,
      surname: payload.lastName,
      idNumber: payload.idNumber,
      accountNumber: payload.accountNumber,
      password: payload.password,
      confirmPassword: formData.confirmPassword,
    });
    if (!v.ok) return alert(v.message);

    try {
      const res = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registration successful!");
        console.log(data);
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error registering:", err);
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
    handleRegister(e);
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="Totally Secure Logo" className="logo" />
        <h1>Totally $ecure</h1>
      </header>

      <div className="login-panels">
        <div className="left-panel">
          <h2>Register for Totally $ecure</h2>
          <p>Enter the required information in all fields to complete your registration.</p>

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
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setField('firstName', e.target.value)}
                  pattern={re.name.source}
                  title="Letters, spaces, hyphen and apostrophe only (2–50 chars)."
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
                  onChange={(e) => setField('surname', e.target.value)}
                  pattern={re.name.source}
                  title="Letters, spaces, hyphen and apostrophe only (2–50 chars)."
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
                onChange={(e) => setField('email', e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="idNumber">ID Number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                placeholder="13 digits"
                value={formData.idNumber}
                onChange={(e) => setField('idNumber', e.target.value)}
                inputMode="numeric"
                pattern="\d{13}"
                title="ID number must be exactly 13 digits"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                placeholder="9-12 digits"
                value={formData.accountNumber}
                onChange={(e) => setField('accountNumber', e.target.value)}
                inputMode="numeric"
                pattern="\d{9,12}"
                title="Account number must be 9–12 digits"

                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Create Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="8+ chars, upper/lower/digit/special"
                value={formData.password}
                onChange={(e) => setField('password', e.target.value)}
                pattern={re.passwordStrong.source}
                title="Min 8, include upper, lower, digit and special character."
                autoComplete="new-password"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="login-btn" disabled={disabled}>
              {disabled ? "Please wait..." : "Register"}
            </button>
          </form>

          <p className="register-link">
            Already have an account? <Link to="/login">Login.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
