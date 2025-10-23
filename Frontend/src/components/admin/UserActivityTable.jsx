import React from 'react';
import '../../styles/adminDashboard.css';

const UserActivityTable = ({ users }) => {
  return (
    <div className="user-activity">
      <h3>User Activity</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivityTable;
