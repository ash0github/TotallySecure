import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';
import { useNavigate } from 'react-router-dom';
import { sanitize, validateFields, re } from '../utils/validators';

const Transactions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const [selectedCurrency, setSelectedCurrency] = useState('ZAR');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currency: 'ZAR',
    beneficiaryAccn: '',
    firstName: '',
    lastName: '',
    amount: '',
    swiftCode: ''
  });

  const setField = (name, value) => {
    let v = value;
    if (name === 'beneficiaryAccn') v = sanitize.digits(v).slice(0, 10);
    if (name === 'firstName' || name === 'lastName') v = sanitize.text(v);
    if (name === 'amount') v = sanitize.money(v);
    if (name === 'swiftCode') v = sanitize.upperAz09(v).slice(0, 11);
    setFormData((prev) => ({ ...prev, [name]: v }));
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowDropdown(false);
  };

  const handleContinue = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    navigate('/confirm-transfer', {
      state: {
        ...formData,
        currency: selectedCurrency,
        fromAccountHolder: user.name || 'Unknown User',
        fromAccountNumber: user.accountNumber || 'N/A'
      }
    });
  };

  // Submit to backend with allow-list validation
  const handleTransaction = async (e) => {
    e.preventDefault();

    const v = validateFields({
      accountNumber: formData.beneficiaryAccn,
      firstName: formData.firstName,
      surname: formData.lastName,
      amount: formData.amount,
      swiftCode: formData.swiftCode,
    });
    if (!v.ok) return alert(v.message);

    try {
      const res = await fetch(`${API_URL}transaction/transact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currency: selectedCurrency,
          beneficiary: `${formData.firstName} ${formData.lastName}`.replace(/\s+/g, ' ').trim(),
          beneficiaryAccn: formData.beneficiaryAccn,
          amount: Number(formData.amount),
          swiftCode: formData.swiftCode, // already forced upper A-Z/0-9
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Transaction submitted!");
        console.log(data);
        handleContinue();
      } else {
        alert(data.message || "Transaction failed");
      }
    } catch (err) {
      console.error("Error Transacting:", err);
      alert("Server error");
    }
  };

  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-box">
          <div className="transfer-header">Transfer</div>

          <form className="transfer-form" onSubmit={handleTransaction} noValidate>
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
                placeholder="9-12 digits"
                id="beneficiaryAccn"
                name="beneficiaryAccn"
                value={formData.beneficiaryAccn}
                onChange={(e) => setField('beneficiaryAccn', e.target.value)}
                inputMode="numeric"
                pattern="\d{9,12}"
                title="Account number must be exactly 9-12 digits"
                required
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
                  onChange={(e) => setField('firstName', e.target.value)}
                  pattern={re.name.source}
                  title="Letters, spaces, hyphen and apostrophe only (2–50 chars)."
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
                  onChange={(e) => setField('lastName', e.target.value)}
                  pattern={re.name.source}
                  title="Letters, spaces, hyphen and apostrophe only (2–50 chars)."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                placeholder="e.g. 100 or 100.50"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={(e) => setField('amount', e.target.value)}
                inputMode="decimal"
                pattern={re.amount.source}
                title="Positive amount, up to 2 decimals."
                required
              />
            </div>

            <div className="form-group">
              <label>SWIFT Code</label>
              <input
                type="text"
                placeholder="8 or 11 chars (A–Z/0–9)"
                id="swiftCode"
                name="swiftCode"
                value={formData.swiftCode}
                onChange={(e) => setField('swiftCode', e.target.value)}
                pattern={re.swift.source}
                title="SWIFT must be 8 or 11 chars. Example: DEUTDEFF or DEUTDEFF500"
                maxLength={11}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => window.history.back()}>
                Cancel
              </button>
              <button className="continue-button" type="submit">Continue</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
