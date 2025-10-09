import React, { useState } from 'react';
import '../styles/mfa.css';
import logo from '../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';

const MFA = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(Array(6).fill(''));
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
  const fullCode = code.join('');
  const email = localStorage.getItem("email");

  try {
    const res = await fetch(`${API_URL}auth/verifyOTP`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: fullCode }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/userdashboard"); 
    } else {
      alert(data.message || "Verification failed");
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    alert("Server error");
  }
};

  return (
    <div className="mfa-wrapper">
      {/* Header */}
            <header className="mfa-header">
              <img src={logo} alt="Totally Secure Logo" className="logo" />
              <h1>Totally $ecure</h1>
            </header>

      <main className="mfa-main">
        <div className="mfa-card">
            <h2>Multi-Factor Authentication</h2>
            <p>Please enter the code sent to your email to proceed.</p>
        </div>

        {/* Input Fields */}
        <div className="mfa-input-group">
        {code.map((digit, index) => (
            <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            className="mfa-input"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            />
        ))}
        </div>

        <button className="mfa-submit" onClick={handleSubmit}>
          Submit
        </button>
      </main>
    </div>
  );
};

export default MFA;
