import React from 'react';
import { useNavigate } from 'react-router-dom';
import bankCardsIcon from '../assets/Bank_Cards.svg';
import '../styles/Dashboard.css';

const NewTransactionCard = () => {
  const navigate = useNavigate();

  return (
    <div className="new-transaction-section">
      <h2>New Transaction</h2> 
        <p>Safely start the process for a new secure payment.</p> 

      <div className="transaction-icon"> 
        <img src={bankCardsIcon} alt="Bank Cards" /> 
      </div> 
      
      <div className="start-button-wrapper"> 
        <button onClick={() => navigate('/transactions')}>Start</button> 
      </div> 

    </div>
  );
};

export default NewTransactionCard;
