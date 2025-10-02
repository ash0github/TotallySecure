import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import TransactionTable from "../components/TransactionTable"
import StatsCards from "../components/StatsCards"
import NewTransactionCard from "../components/NewTransactionCard";
import DashboardHeader from '../components/DashboardHeader';

const UserDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-main">
      <DashboardHeader/>

        <StatsCards/>

        <div className="dashboard-bottom-row">
          <TransactionTable/>
          <NewTransactionCard/>
        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
