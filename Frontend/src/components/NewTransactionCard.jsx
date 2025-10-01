import React from 'react';
import { useNavigate } from 'react-router-dom';


const NewTransactionCard = () => {
  const navigate = useNavigate();

  return (
    <div className="new-transaction-card">
      <h2>New Transaction</h2>
      <p>Easily start the process for a new secure payment.</p>
      <button onClick={() => navigate('/transactions')}>Start</button>
    </div>
  );
};

export default NewTransactionCard;
