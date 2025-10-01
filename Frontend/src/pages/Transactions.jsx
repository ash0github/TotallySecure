import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';

const Transactions = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(prev => !prev);

  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-box">
          <div className="transfer-header">Transfer</div>

        <form className="transfer-form">
          <div className="currency-selector-wrapper">
          <div className="currency-selector">
            <button className="currency-button">ZAR</button>
            <button className="currency-button">USD</button>
            <button className="currency-button">EUR</button>
            <button className="currency-button">AUD</button>
              <button type="button" className="currency-dropdown-button" onClick={toggleDropdown}>▼</button>
          </div>
          
          {showDropdown && (
            <div className="currency-dropdown-list">
              <button className="currency-button">AED</button>
              <button className="currency-button">BOB</button>
              <button className="currency-button">GBP</button>
            </div>
          )}
          </div>

          <div className="form-group">
            <label>Beneficiary Account Number</label>
            <input type="text" placeholder="Enter account number" />
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
            <input type="text" placeholder="Enter SWIFT code" />
          </div>

          <div className="form-actions">
            <button className="cancel-button">Cancel</button>
            <button className="continue-button">Continue</button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default Transactions;

