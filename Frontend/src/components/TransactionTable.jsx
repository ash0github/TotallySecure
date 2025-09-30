import React from 'react';

const transactions = [
  { date: '02/04/2025', amount: 530, currency: 'ZAR', status: 'Completed' },
  { date: '02/04/2025', amount: 530, currency: 'ZAR', status: 'Completed' },
  { date: '02/04/2025', amount: 530, currency: 'ZAR', status: 'Completed' },
];

const TransactionTable = () => (
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
        {transactions.map((tx, i) => (
          <tr key={i}>
            <td>{tx.date}</td>
            <td>{tx.amount}</td>
            <td>{tx.currency}</td>
            <td>{tx.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TransactionTable;
