import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const [selectedCurrency, setSelectedCurrency] = useState('ZAR'); // default currency
  const navigate = useNavigate();

   const handleContinue = () => {
    navigate('/confirm-transfer');
  };

    const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowDropdown(false); // close dropdown after selection
  };

  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-box">
          <div className="transfer-header">Transfer</div>

        <form className="transfer-form">
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
            <input type="text" 
            placeholder="Enter account number" 
            pattern="\d{10}"
            title="Account number must be exactly 10 digits"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Enter first name" />
            </div>
            <div className="form-group">
              <label>Surname</label>
              <input type="text" placeholder="Enter surname" />
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" />
          </div>

          <div className="form-group">
            <label>SWIFT Code</label>
            <input type="text" placeholder="Enter SWIFT code" 
            pattern="/id{A-Z}{8}"
            title="Swift code must be 8 capital letters"
            />
          </div>

          <div className="form-actions">
            <button className="cancel-button">Cancel</button>
            <button className="continue-button" onClick={handleContinue}>Continue</button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default Transactions;

