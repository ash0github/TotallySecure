import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/TransactionHistory.css";
import ErrorBoundary from "../components/ErrorBoundary";

const mockTransactions = [
  {
    date: "2025-10-10T15:45:20.787Z",
    amount: "530",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "ZAR",
    status: "Completed",
  },
  {
    date: "2025-10-10T15:45:20.787Z",
    amount: "250",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "USD",
    status: "Completed",
  },
  {
    date: "2025-10-10T15:45:20.787Z",
    amount: "1000",
    beneficiaryName: "Name Surname",
    beneficiaryAccount: "1233455634563",
    currency: "EUR",
    status: "Completed",
  },
  {
    date: "2025-10-10T15:45:20.787Z",
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
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${API_URL}transaction/fetchTransactions`, {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
          // use empty array if undefined
          setTransactions(data.transactions ?? []);
          console.log("✅ Transactions fetched!");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]); // empty array if fetch fails
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ErrorBoundary>
      <div className="transactions-wrapper">
        <Sidebar />

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
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((txn, index) => {
                    // safe date parsing
                    const rawDate = txn.date || txn.dated || "";
                    const dateObj = new Date(rawDate);
                    const formattedDate = !rawDate || isNaN(dateObj)
                      ? "N/A"
                      : `${String(dateObj.getDate()).padStart(2,"0")}/${String(dateObj.getMonth()+1).padStart(2,"0")}/${dateObj.getFullYear()}`;

                    // safe beneficiary
                    const beneficiaryName = txn.beneficiaryName || txn.beneficiary || "N/A";

                    return (
                      <tr key={index}>
                        <td>{formattedDate}</td>
                        <td>{txn.currency || "N/A"}</td>
                        <td>{txn.amount || "N/A"}</td>
                        <td>{beneficiaryName}</td>
                        <td>
                          <span className={`status ${txn.status?.toLowerCase() || ""}`}>
                            {txn.status || "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default TransactionHistory;
