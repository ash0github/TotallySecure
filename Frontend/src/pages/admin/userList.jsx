import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/adminSidebar";
import "../../styles/TransactionHistory.css";
import ErrorBoundary from "../../components/ErrorBoundary";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with actual fetch logic
    const mockUsers = [
      {
        id: "09318901",
        fullName: "John Doe",
        username: "JohnDoe231",
        registrationDate: "2025-12-12",
        status: "Active",
      },
      {
        id: "0312095144989",
        fullName: "Jane Smith",
        username: "JaneSmith89",
        registrationDate: "2024-11-05",
        status: "Inactive",
      },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <ErrorBoundary>
      <div className="userlist-wrapper">
        <Sidebar />

        <div className="userlist-content">
          <div className="user-header">
            <h1>User List</h1>
                <p>
                Welcome to the Users List. This section provides administrators with a centralised view of all 
                registered users. Review user profiles, monitor account activity, and manage permissions to ensure 
                secure and efficient system operations.
                </p>
          </div>

          <div className="user-table-container">
            <div className="table-label">Users</div>
            <table className="user-table">
              <thead>
                <tr className="header-row">
                  <th>User ID</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Registration Date</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#555" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => {
                    const dateObj = new Date(user.registrationDate);
                    const formattedDate = isNaN(dateObj)
                      ? "N/A"
                      : `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;

                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.username}</td>
                        <td>{formattedDate}</td>
                        <td>
                          <span className={`status ${user.status.toLowerCase()}`}>
                            {user.status}
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

export default UserList;
