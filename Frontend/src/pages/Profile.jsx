import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Profile.css';
import passwordEye from '../assets/password_eye.svg';
import iconsBackground from '../assets/icons_background.svg';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [fullname, setFullname] = useState();
  const [idNumber, setIDnumber] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [email, setEmail] = useState();
  const [defaultCurrency, setDefaultCurrency] = useState();
  const [password, setPassword] = useState();
  const [balance, setBalance] = useState();

  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const [currentBalance, setCurrentBalance] = useState(user?.balance || 6370.25);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [error, setError] = useState('');

  const actualPassword = 'xxxxxxxxxx'; // Replace with actual password logic

  // Add Funds Modal
  const openAddFunds = () => setShowAddFunds(true);
  const closeAddFunds = () => setShowAddFunds(false);

  // Coming Soon Modal
  const openComingSoon = () => setShowComingSoon(true);
  const closeComingSoon = () => setShowComingSoon(false);

  // Input handler
  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(value);

    if (value === '') {
      setAmountToAdd(0);
      setError('');
    } else if (isNaN(numericValue) || numericValue < 0) {
      setAmountToAdd(0);
      setError('Please enter a valid positive number');
    } else {
      setAmountToAdd(numericValue);
      setError('');
    }
  };

  // Complete Add Funds
  const handleCompleteAddFunds = () => {
    // instead of update balance - show coming soon modal
    setShowComingSoon(true);
  };

  // Toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);

  useEffect(() => {
      const fetchProfile = async () => {
        try
        {
          const res = await fetch(`${API_URL}user/fetchUser`, {
            credentials: "include", //for cookies
            headers: { "Content-Type": "application/json" },
          });
  
          const data = await res.json();
          if (res.ok) 
          {
            setFullname(data.user.username);
            setIDnumber(data.user.concatID);
            setAccountNumber(data.user.concatAccn);
            setEmail(data.user.email);
            setDefaultCurrency(data.user.currencyPreference);
            setPassword(data.user.password);
            setBalance(Number(data.balance));

            console.log("✅ Profile fetched!");
          }
        }
        catch (err) 
        {
          console.error("Error fetching user profile:", err);
        }
      };
  
      fetchProfile();
    }, []);

  return (
    <div className="profile-wrapper">
      <Sidebar />
      <div className="profile-main">
        {/* Background image */}
        <img src={iconsBackground} alt="Background Icons" className="profile-background" />

        <h2 className="profile-header">Profile Settings</h2>
        <p>
          Manage your profile and account settings here. You can update your details, change your password, and customise preferences to keep your banking experience secure and tailored to you.
        </p>

        {/* Profile Sections Grid */}
        <div className="profile-grid">
          {/* Profile Information */}
          <div className="profile-card">
            <h3>Profile Information</h3>
            <div className="info-row"><span className="info-label">Full Name:</span><span className="info-value">{fullname}</span></div>
            <div className="info-row"><span className="info-label">ID Number:</span><span className="info-value">{idNumber}</span></div>
            <div className="info-row"><span className="info-label">Account Number:</span><span className="info-value">{accountNumber}</span></div>
            <div className="info-row"><span className="info-label">Email Address:</span><span className="info-value">{email}</span></div>
          </div>

          {/* Preferences */}
          <div className="profile-card">
            <h3>Preferences</h3>
            <div className="currency-selector-wrapper">
              <label htmlFor="currency" className="currency-label">Default Currency:</label>
              <select id="currency" className="currency-dropdown" defaultValue={defaultCurrency}>
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
            <div className="balance-amount-box">R {Number(balance).toFixed(2)}</div>
            <div className="balance-actions">
              <button className="add-funds-button" onClick={openAddFunds}>Add Funds</button>
              <button className="transfer-button" onClick={() => navigate('/transactions')}>Make a Transfer</button>
            </div>
          </div>

          {/* Security Card */}
          <div className="profile-card">
            <h3>Security</h3>
            <div className="password-container">
              <span className="password-label">Password:</span>
              <div className="password-box">
                <span className="password-text">{showPassword ? password : '********'}</span>
                <img
                  src={passwordEye}
                  alt="Toggle Password Visibility"
                  className="password-eye"
                  onClick={togglePassword}
                />
              </div>
            </div>
            <div className="security-actions">
              <button className="change-password-button" onClick={openComingSoon}>Change Password</button>
              <button className="sign-out-button" onClick={() => navigate('/login')}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="modal-overlay" onClick={closeAddFunds}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>Add Funds</h3></div>
            <div className="modal-body">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                className="modal-input"
                placeholder="Enter amount"
                value={amountToAdd === 0 ? '' : amountToAdd}
                onChange={handleAmountChange}
              />
              {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
              <label htmlFor="updated-balance">Your updated balance:</label>
              <input
                type="text"
                id="updated-balance"
                className="modal-input"
                disabled
                value={`R ${(currentBalance + amountToAdd).toFixed(2)}`}
              />
              <div className="modal-actions">
                <button className="cancel-button" onClick={closeAddFunds}>Cancel</button>
                <button
                  className="complete-button"
                  onClick={handleCompleteAddFunds}
                  disabled={amountToAdd <= 0 || error !== ''}
                  style={{
                    opacity: amountToAdd <= 0 || error !== '' ? 0.6 : 1,
                    cursor: amountToAdd <= 0 || error !== '' ? 'not-allowed' : 'pointer'
                  }}
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="modal-overlay" onClick={closeComingSoon}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>Coming Soon!</h3></div>
            <div className="modal-body">
              <p>This feature will be available in Part 3.</p>
              <div className="modal-actions">
                <button className="cancel-button" onClick={closeComingSoon}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
