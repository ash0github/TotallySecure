import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css';
import TransactionTable from "../components/TransactionTable"
import StatsCards from "../components/StatsCards"
import NewTransactionCard from "../components/NewTransactionCard";
import DashboardHeader from '../components/DashboardHeader';
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  // get the username from localstorage (set after login)
  const userEmail = localStorage.getItem("email") || "User";
  const [username, setUsername] = useState("User");
  const [balance, setBalance] = useState();
  const [completed, setCompleted] = useState();
  const [pending, setPending] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try
      {
        const res = await fetch(`${API_URL}user/dashboard`, {
          credentials: "include", //for cookies
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if(res.ok)
        {
          setUsername(data.user.username);
          setBalance(data.accn.balance);
          setCompleted(data.completed);
          setPending(data.pending);
          setTransactions(data.transactions);
          
          console.log("✅ Dashboard fetched!");
        }
      }
      catch (err) 
      {
        console.error("Error fetching user dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        <DashboardHeader username={username} />

        <StatsCards balance={balance} completed={completed} pending={pending}/>

        <div className="dashboard-bottom-row">
          <TransactionTable transactions={transactions}/>
          <NewTransactionCard/>
        </div>

      </main>
    </div>
  );
};

export default UserDashboard;
