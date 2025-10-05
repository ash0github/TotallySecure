import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Profile.css';
import passwordEye from '../assets/password_eye.svg';
import iconsBackground from '../assets/icons_background.svg';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const actualPassword = 'securePass123'; // Replace with actual password logic

  // Toggle password visibility

    const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="profile-wrapper">
      <Sidebar />
      <main className="profile-main">
        
        {/* background image */}
         <img
            src={iconsBackground}
            alt="Background Icons"
            className="profile-background"
        />

          <h2 className="profile-header">Profile Settings</h2>
          <p>Manage your profile and account settings here.
            You can update your details, change your password, and customise preferences to keep your banking experience secure and tailored to you.
          </p>
          
          {/* Profile Sections Grid */}
          <div className="profile-grid">
            {/* Profile Information Card */}
            <div className="profile-card">
                <h3>Profile Information</h3>
                <div className="info-row">
                    <span className="info-label">Full Name:</span>
                    <span className="info-value">John Doe</span>
                </div>
                <div className="info-row">
                    <span className="info-label">ID Number:</span>
                    <span className="info-value">123904821</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Account Number:</span>
                    <span className="info-value">123091823</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Email Address:</span>
                    <span className="info-value">JohnDoe@gmail.com</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Phone Number:</span>
                    <span className="info-value">1234567890</span>
                </div>
            </div>

            {/* Preferences Card */}
            <div className="profile-card">
                <h3>Preferences</h3>

                <div className="currency-selector-wrapper">
                    <label htmlFor="currency" className="currency-label">Default Currency:</label>
                    <select id="currency" className="currency-dropdown">
                    <option value="ZAR">ZAR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AUD">AUD</option>
                    <option value="JPY">JPY</option>
                    <option value="INR">INR</option>
                    </select>
                </div>
            </div>

            {/* Balance Card */}
            <div className="profile-card">
                <h3>Current Balance</h3>

                <div className="balance-amount-box">
                    R 6370.25
                </div>

                <div className="balance-actions">
                    <button className="add-funds-button">Add Funds</button>
                    <button className="transfer-button" onClick={() => navigate('/transactions')}>Make a Transfer</button>
                </div>
            </div>

            {/* Security Card */}
            <div className="profile-card">
                <h3>Security</h3>
                
                <div className="password-container">
                    <span className="password-label">Password:</span>

                    <div className="password-box">
                        <span className="password-text">
                             {showPassword ? actualPassword : '********'}
                        </span>
                        <img
                            src={passwordEye}
                            alt="Toggle Password Visibility"
                            className="password-eye"
                            onClick={togglePassword}
                        />
                    </div>
                </div>
                <div className="security-actions">
                    <button className="change-password-button">Change Password</button>
                    <button className="sign-out-button" onClick={() => navigate('/login')}>Sign Out</button>
                </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default Profile;
