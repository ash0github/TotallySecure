import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';
import bankCardsIcon from '../assets/Bank_Cards.svg';
import transferArrows from '../assets/transfer_arrows.svg';

const FinalTransactions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {}; // fallback if no data passed

  // generate reference once per load
  const [reference] = useState(`#TSQ${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const handleConfirm = () => {
    alert('✅ Transfer confirmed!');
    navigate('/dashboard');
  };

  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-complete-box">
          <div className="transfer-header">Transfer Complete</div>

         <div className="transfer-content">
          {/* Confirmation Header */}
          <div className="confirmation-message flex-row">
            <img src={bankCardsIcon} alt="Bank Cards" className="header-icon" />
            <div className="confirmation-text">
              <h2>Transaction Completed</h2>
              <p>Your transfer has been successfully processed. Below is a summary for your records.</p>
            </div>
          </div>

          <div className="divider">
            <hr className="confirmation-divider" />
          </div>

          {/* Payment Details Card */}
          <div className="payment-details-container">
            <h3>Payment Details</h3>
            <p>
              Amount:{' '}
              {formData.amount
                ? new Intl.NumberFormat('en-ZA', { style: 'currency', currency: formData.currency }).format(formData.amount)
                : 'N/A'}
            </p>
            <p>Date of Transfer: {new Date().toLocaleDateString('en-GB')}</p>
            <p>Reference: {reference}</p>
          </div>

          {/* From / To Blocks */}
          <div className="transfer-block">
            <h3>From</h3>
            <p>Account Holder: {formData.fromAccountHolder || 'N/A'}</p>
            <p>Account Number: {formData.fromAccountNumber || 'N/A'}</p>
          </div>

          <div className="confirmation-visuals">
            <img src={transferArrows} alt="Transfer Arrows" className="transfer-arrows" />
          </div>

          <div className="transfer-block">
            <h3>To</h3>
            <p>Beneficiary Name: {`${formData.firstName || ''} ${formData.lastName || ''}`.trim()}</p>
            <p>Beneficiary Account Number: {formData.beneficiaryAccn || 'N/A'}</p>
            <p>SWIFT Code: {formData.swiftCode || 'N/A'}</p>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
            <button className="continue-button" onClick={handleConfirm}>Complete</button>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalTransactions;
