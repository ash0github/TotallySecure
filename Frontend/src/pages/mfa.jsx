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

  // Handle continuous backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // If backspace is pressed on an empty field, focus the previous field
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  // Handle pasting the code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted data is a 6-digit number
    if (pastedData.length === 6 && /^[0-9]{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
      
      // Focus the last input after paste
      document.getElementById('code-5').focus();
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
      credentials: 'include'
    });

    const data = await res.json();
    if (res.ok) {
      console.log("✅ Verification successful");
      // localStorage.setItem("token", data.token); //insecure and prone to xss attacks
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

        <div className="mfa-outline-card">
          <div className="mfa-card">
              <h2>Multi-Factor Authentication</h2>
              <p>Please enter the code sent to your email to proceed.</p>
          </div>

          {/* Input Fields */}
          <div className="mfa-input-group" onPaste={handlePaste}>
          {code.map((digit, index) => (
              <input
              key={index}
              id={`code-${index}`}
              type="tel"
              inputMode="numeric" // for browser to show numeric pad
              autoComplete="one-time-code"
              maxLength="1"
              className="mfa-input"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              />
          ))}
          </div>

          <button className="mfa-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default MFA;
