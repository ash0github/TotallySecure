import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/TransactionHistory.css";


const mockTransactions = [
  {
    date: "02/04/2025",
    amount: "530",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "ZAR",
    status: "Completed",
  },
  {
    date: "02/04/2025",
    amount: "250",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "USD",
    status: "Completed",
  },
  {
    date: "01/04/2025",
    amount: "1000",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "EUR",
    status: "Completed",
  },
  {
    date: "30/03/2025",
    amount: "750",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "ZAR",
    status: "Completed",
  },
];

const TransactionHistory = () => {
  return (
    <div className="transactions-wrapper">
      
      <Sidebar />

      {/* Main Content */}
      <div className="transactions-main transaction-history">
        {/* Header */}
        <div className="history-header">
          <h1>Transaction History</h1>
          <p>
            Welcome to your <strong>Transactions History</strong>. Here you can
            view all your past deposits, withdrawals, transfers, and payments in
            one place. Keep track of your account activity and stay on top of
            your finances.
          </p>
        </div>

        {/* Table */}
        <div className="history-table-container">
          <div className="table-label">History</div>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Beneficiary Name</th>
                <th>Beneficiary Account Number</th>
                <th>Currency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.date}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.beneficiaryName}</td>
                  <td>{txn.beneficiaryAccount}</td>
                  <td>{txn.currency}</td>
                  <td>
                    <span className={`status ${txn.status.toLowerCase()}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
