import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/TransactionHistory.css";
import iconsBackground from '../assets/icons_background.svg';
import { useState, useEffect } from "react";

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
  const API_URL = import.meta.env.VITE_API_URL;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTranscations = async () => {
      try
      {
        const res = await fetch(`${API_URL}transaction/fetchTransactions`, {
          credentials: "include", //for cookies
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          setTransactions(data.transactions)
          console.log("✅ Transactions fetched!");
          //alert("✅ Transactions fetched!");
        }
      }
      catch (err) 
      {
        setTransactions(mockTransactions)
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTranscations();
  }, []);

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
              <tr className="header-row">
                <th>Date</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Beneficiary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>{new Date(txn.dated).toISOString().split('T')[0]}</td>
                  <td>{txn.currency}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.beneficiary}</td>
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
