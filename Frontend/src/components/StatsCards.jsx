import React from 'react';

const StatsCards = ({ balance, completed, pending }) => (
  <div className="stats-cards">
    <div className="card">
      <h2>Current Balance</h2>
      <p>R {balance !== undefined ? balance.toFixed(2) : "0.00"}</p>
    </div>
    <div className="card">
      <h2>Completed Payments</h2>
      <p>{completed}</p>
    </div>
    <div className="card">
      <h2>Pending Payments</h2>
      <p>{pending}</p>
    </div>
  </div>
);

export default StatsCards;
