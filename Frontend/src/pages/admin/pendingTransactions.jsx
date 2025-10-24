import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/adminSidebar";
import "../../styles/adminTransaction.css";
import ErrorBoundary from "../../components/ErrorBoundary";
import PendingTable from "../../components/admin/Transactions/PendingTable";
import FlaggedTable from "../../components/admin/Transactions/FlaggedTable";
import ApprovedTable from "../../components/admin/Transactions/ApprovedTable";

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
    console.log(`Approved t ransaction ${id}`);
  };

  const onReject = (id) => {
    console.log(`Rejected transaction ${id}`);
  };

  const [view, setView] = useState("pending");

  const flaggedTransactions = [/* Data */ 
    {
        id: "091238901",
        fullName: "John Doe",
        beneficiaryName: "Mary Sue",
        accountNumber: "182947291",
        amount: "R1239.75",
        swift: "BCS312",
        date: "2025-12-12",
      },
  ];

  const onDelete = (id) => {
  console.log(`Deleted flagged transaction ${id}`);
};

const approvedTransactions = [
  {
    id: "091238903",
    fullName: "John Doe",
    beneficiaryName: "Mary Sue",
    accountNumber: "182947291",
    amount: "R1239.75",
    swift: "BCS312",
    date: "2025-12-12",
  },
];

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
          
            {/* Pending Table */}
            {view === "pending" && (
            <PendingTable
                transactions={transactions}
                onApprove={onApprove}
                onReject={onReject}
                setView={setView}
                />
            )}

            {/* Flagged Table */}
            {view === "flagged" && (
            <FlaggedTable
                transactions={flaggedTransactions}
                onDelete={onDelete}
                setView={setView}
                />
            )}

            {/* Approved Table */}
            {view === "approved" && (
              <ApprovedTable
                transactions={approvedTransactions}
                onDelete={onDelete}
                onApprove={onApprove}
                setView={setView}
              />
            )}
            
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PendingTransactions;
