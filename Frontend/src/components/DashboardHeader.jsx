import React from 'react';

const DashboardHeader = ({ username }) => (
  <div className="dashboard-header">
    <h1>Welcome, {username} to your Dashboard 👋</h1>
  </div>
);

export default DashboardHeader;
