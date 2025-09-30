import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import bankCardsIcon from '../assets/Bank_Cards.svg';

const UserDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome, Wanker to your Dashboard👋</h1>
        </div>

        <div className="stats-cards">
          <div className="card">
            <h2>Current Balance</h2>
            <p>R 6370.25</p>
          </div>
          <div className="card">
            <h2>Recent Payments</h2>
            <p>3</p>
          </div>
          <div className="card">
            <h2>Pending Payments</h2>
            <p>2</p>
          </div>
        </div>

        <div className="dashboard-bottom-row">
        <div className="transaction-table">
          <h2>Transaction Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>02/04/2025</td>
                <td>530</td>
                <td>ZAR</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>01/04/2025</td>
                <td>320</td>
                <td>ZAR</td>
                <td>Completed</td>
              </tr>
              <tr>
                <td>31/03/2025</td>
                <td>320</td>
                <td>ZAR</td>
                <td>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="new-transaction-section">
  <h2>New Transaction</h2>
  <p>Safely start the process for a new secure payment.</p>
  <div className="transaction-icon">
    <img src={bankCardsIcon} alt="Bank Cards" />
  </div>
  <div className="start-button-wrapper">
    <button onClick={() => navigate('/new-transaction')}>Start</button>
  </div>
</div>
</div>

      </main>
    </div>
  );
};

export default UserDashboard;
