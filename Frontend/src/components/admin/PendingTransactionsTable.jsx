import React from 'react';
import approveIcon from '../../assets/approve-btn.svg';
import rejectIcon from '../../assets/reject-btn.svg';
import '../../styles/adminDashboard.css';

const PendingTransactionsTable = ({ transactions, onApprove, onReject }) => {
  return (
    <div className="pending-transactions">
      <h3>Pending Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx}>
              <td>{tx.id}</td>
              <td>{tx.user}</td>
              <td>R {tx.amount.toFixed(2)}</td>
              <td>
                <button className="action-btn" onClick={() => onApprove(tx.id)}>
                    <img src={approveIcon} alt="Approve" className="action-icon" />
                </button>
                <button className="action-btn" onClick={() => onReject(tx.id)}>
                    <img src={rejectIcon} alt="Reject" className="action-icon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTransactionsTable;
