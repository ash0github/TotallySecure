import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const [selectedCurrency, setSelectedCurrency] = useState('ZAR'); // default currency
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      currency: 'ZAR',
      beneficiaryAccn: '',
      firstName: '',
      lastName: '',
      amount: '',
      swiftCode: ''
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    navigate('/confirm-transfer');
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowDropdown(false); // close dropdown after selection
  }

  // Connects to Backend server Transaction Routes
  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}transaction/transact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: selectedCurrency || formData.currency,
          beneficiary: `${formData.firstName} ${formData.lastName}`,
          beneficiaryAccn: formData.beneficiaryAccn,
          amount: formData.amount,
          swiftCode: formData.swiftCode,
        }),
        credentials: "include" //for cookies
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Transaction submitted!");
        console.log(data);
        // Redirect to login
        handleContinue();
      } 
      else 
      {
        alert(data.message || "Transaction failed");
      }
    } 
    catch (err) 
    {
      console.error("Error Transacting:", err);
    }
  };

  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-box">
          <div className="transfer-header">Transfer</div>

        <form className="transfer-form" onSubmit={handleTransaction}>
            {/* Currency Selector */}
            <div className="currency-selector-wrapper">
              <div className="currency-buttons-row">
                {['ZAR', 'USD', 'EUR', 'AUD'].map((currency) => (
                  <button
                    key={currency}
                    type="button"
                    className={`currency-button ${selectedCurrency === currency ? 'active' : ''}`}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency}
                  </button>
                ))}

                <button
                  type="button"
                  className="currency-dropdown-button"
                  onClick={toggleDropdown}
                >
                  ▼
                </button>
              </div>

              {showDropdown && (
                <div className="currency-dropdown-list">
                  {['AED', 'BOB', 'GBP'].map((currency) => (
                    <button
                      key={currency}
                      type="button"
                      className={`currency-button ${selectedCurrency === currency ? 'active' : ''}`}
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
            </div>

          <div className="form-group">
            <label>Beneficiary Account Number</label>
            <input 
              type="text"
              placeholder="Enter account number"
              id="beneficiaryAccn"
              name="beneficiaryAccn"
              value={formData.beneficiaryAccn}
              onChange={handleChange}
              required
              pattern="\d{10}"
              title="Account number must be exactly 10 digits"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text"
                placeholder="Enter first name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Surname</label>
              <input 
                type="text"
                placeholder="Enter surname"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input 
              type="number"
              placeholder="Enter amount"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>SWIFT Code</label>
            <input 
              type="text"
              placeholder="Enter SWIFT code"
              id="swiftCode"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
              required
              pattern="/id{A-Z}{8}"
              title="Swift code must be 8 capital letters"
            />
          </div>

          <div className="form-actions">
            <button className="cancel-button">Cancel</button>
            <button className="continue-button" type="submit">Continue</button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default Transactions;