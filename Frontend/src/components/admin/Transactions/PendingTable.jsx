import "../../../styles/adminTransaction.css";
import approveIcon from "../../../assets/approve-btn.svg";
import rejectIcon from "../../../assets/reject-btn.svg";
import flaggedIcon from "../../../assets/Flagged-icon.png";
import approvedTransactionIcon from "../../../assets/approved-transaction-icon.svg";

const PendingTable = ({ transactions, onApprove, onReject, setView }) => {
    return (
    <div className="pending-transaction-table-container">
            <div className="table-header">
                <div className="table-label">Pending Transactions</div>
                    <div className="header-actions">
                      <div className="tooltip-wrapper">
                          <button className="table-switch-btn" onClick={() => setView("flagged")}>
                              <img src={flaggedIcon} alt="Flagged Transactions" />
                          </button>
                          <span className="tooltip-text">Flagged Transactions</span>
                      </div>
                      <div className="tooltip-wrapper">
                        <button className="table-switch-btn" onClick={() => setView("approved")}>
                            <img src={approvedTransactionIcon} alt="Approved Transactions" />
                        </button>
                        <span className="tooltip-text">Approved Transactions</span>
                      </div>
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
    );
};

export default PendingTable;