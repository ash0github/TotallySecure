import React from 'react';
import AdminSidebar from '../../components/admin/adminSidebar';
import QuickStats from '../../components/admin/QuickStats';
import UserActivityTable from '../../components/admin/UserActivityTable';
import PendingTransactionsTable from '../../components/admin/PendingTransactionsTable';
import '../../styles/adminDashboard.css';

const AdminDashboard = () => {
  // mock data — replace with API calls or context later
  const stats = {
    totalUsers: 77,
    pendingTx: 5,
    flaggedTx: 3,
  };

  const users = [
    { name: 'Name 1', status: 'Active' },
    { name: 'Name 2', status: 'Active' },
    { name: 'Name 3', status: 'Active' },
    { name: 'Name 4', status: 'Active' },
  ];

  const transactions = [
    { id: 1002, user: 'Name Surname', amount: 1500.0 },
    { id: 1003, user: 'Name Surname', amount: 1500.0 },
    { id: 1004, user: 'Name Surname', amount: 1500.0 },
    { id: 1005, user: 'Name Surname', amount: 1500.0 },
    { id: 1006, user: 'Name Surname', amount: 1500.0 },
  ];

  const handleApprove = (id) => {
    console.log(`✅ Approved transaction ${id}`);
    // TODO: call backend to approve
  };

  const handleReject = (id) => {
    console.log(`❌ Rejected transaction ${id}`);
    // TODO: call backend to reject
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="dashboard-content">
        <h1>Admin Dashboard</h1>

        <div className="stats-section"> 
            <h1>Quick Stats</h1>
            <QuickStats
            totalUsers={stats.totalUsers}
            pendingTx={stats.pendingTx}
            flaggedTx={stats.flaggedTx}
            />
        </div>
        <div className="table-section">
            <UserActivityTable users={users} />
            <PendingTransactionsTable
            transactions={transactions}
            onApprove={handleApprove}
            onReject={handleReject}
            />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
