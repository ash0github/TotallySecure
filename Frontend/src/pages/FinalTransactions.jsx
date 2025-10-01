import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Transactions.css';
import bankCardsIcon from '../assets/Bank_Cards.svg';
import transferArrows from '../assets/transfer_arrows.svg';

const FinalTransactions = () => {
  return (
    <div className="transactions-wrapper">
      <Sidebar />
      <main className="transactions-main">
        <div className="transfer-box">
          <div className="transfer-header">
            Confirm Transfer
          </div>

          <div className="transfer-form">
            <div className="confirmation-message">
                <img src={bankCardsIcon} alt="Bank Cards" className="header-icon" />
                <div className="confirmation-text">
                    <h2>
                        Please review the details of your transfer before proceeding.
                        </h2>
                    <p>
                        This is your final opportunity to ensure that all information entered is correct.
                        Once confirmed, the transfer cannot be reversed.
                        </p>
                    </div>
                </div>

                <div className="divider">
                            <hr className="confirmation-divider" />
                </div>

                <div className="confirmation-section">
                    <h3>Payment Details</h3>
                    <p>Amount: USD 1,000</p>
                    <p>Reference: #TXN123456</p>
                    <p>Date of Transfer: 01/10/2025</p>

                    <div className="transfer-block">
                        <h3>From</h3>
                        <p>Account Holder: John Doe</p>
                        <p>Account Number: 123456789</p>
                    </div>

                    <div className="confirmation-visuals">
                    <img src={transferArrows} alt="Transfer Arrows" className="transfer-arrows" />
                </div>

                <div className="transfer-block">
                    <h3>To</h3>
                    <p>Beneficiary Name: Jane Smith</p>
                    <p>Beneficiary Account Number: 987654321</p>
                    <p>SWIFT Code: ABCD1234</p>
                </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button">Cancel</button>
              <button className="continue-button">Confirm & Pay</button>
            </div>
          </div>
        </div>
    </main>
    </div>
  );
};

export default FinalTransactions;
