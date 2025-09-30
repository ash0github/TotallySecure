import React from 'react';

const DashboardHeader = ({ username }) => (
  <div className="dashboard-header">
    <h1>Welcome, {username} 👋</h1>
    <p>to your Dashboard</p>
  </div>
);

export default DashboardHeader;
