import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/adminSidebar";
import "../../styles/adminTransaction.css";
import ErrorBoundary from "../../components/ErrorBoundary";
import approveIcon from "../../assets/approve-btn.svg";
import rejectIcon from "../../assets/reject-btn.svg";
import flaggedIcon from "../../assets/Flagged-icon.png";
import approvedTransactionIcon from "../../assets/approved-transaction-icon.svg";

const PendingTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const mockTransactions = [
      {
        id: "091238901",
        fullName: "John Doe",
        beneficiaryName: "Mary Sue",
        accountNumber: "182947291",
        amount: "R1239.75",
        swift: "BCS312",
        date: "2025-12-12",
      },
      {
        id: "091238902",
        fullName: "John Doe",
        beneficiaryName: "Mary Sue",
        accountNumber: "182947291",
        amount: "R1239.75",
        swift: "BCS312",
        date: "2025-12-12",
      },
    ];
    setTransactions(mockTransactions);
  }, []);

  const onApprove = (id) => {
    console.log(`Approved transaction ${id}`);
  };

  const onReject = (id) => {
    console.log(`Rejected transaction ${id}`);
  };

  return (
    <ErrorBoundary>
      <div className="pending-transaction-wrapper">
        <Sidebar />

        <div className="pending-transaction-content">
          <div className="pending-transaction-header">
            <h1>Transactions</h1>
                <p>
                Review and manage all pending international payments below.
                Verify transaction details, confirm SWIFT information, and approve or deny requests to ensure
                secure and accurate processing.
                </p>
          </div>

          <div className="pending-transaction-table-container">
            <div className="table-header">
                <div className="table-label">Pending Transactions</div>
                    <div className="header-actions">
                        <button className="table-switch-btn" onClick={() => setView("flagged")}>
                            <img src={flaggedIcon} alt="Flagged Transactions" />
                        </button>
                        <button className="table-switch-btn" onClick={() => setView("approved")}>
                            <img src={approvedTransactionIcon} alt="Approved Transactions" />
                        </button>
                    </div>
                </div>
            <table className="pending-transaction-table">
              <thead>
                <tr className="header-row">
                  <th>Transaction ID</th>
                  <th>Customer Name</th>
                  <th>Beneficiary Name</th>
                  <th>Account Number</th>
                  <th>Amount</th>
                  <th>SWIFT</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, index) => {
                    const dateObj = new Date(tx.date);
                    const formattedDate = isNaN(dateObj)
                      ? "N/A"
                      : `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;

                    return (
                      <tr key={index}>
                        <td>{tx.id}</td>
                        <td>{tx.fullName}</td>
                        <td>{tx.beneficiaryName}</td>
                        <td>{tx.accountNumber}</td>
                        <td>{tx.amount}</td>
                        <td>{tx.swift}</td>
                        <td>{formattedDate}</td>
                        <td>
                          <button className="action-btn" onClick={() => onApprove(tx.id)}>
                            <img src={approveIcon} alt="Approve" className="action-icon" />
                          </button>
                          <button className="action-btn" onClick={() => onReject(tx.id)}>
                            <img src={rejectIcon} alt="Reject" className="action-icon" />
                          </button>
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

export default PendingTransactions;
