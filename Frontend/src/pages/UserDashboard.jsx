import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import TransactionTable from "../components/TransactionTable"
import StatsCards from "../components/StatsCards"
import NewTransactionCard from "../components/NewTransactionCard";
import DashboardHeader from '../components/DashboardHeader';

const UserDashboard = () => {
  // get the username from localstorage (set after login)
  const username = localStorage.getItem("email") || "User";

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        <DashboardHeader username={username} />

        <StatsCards />

        <div className="dashboard-bottom-row">
          <TransactionTable/>
          <NewTransactionCard/>
        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
