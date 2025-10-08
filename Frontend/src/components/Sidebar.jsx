import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import homeIcon from '../assets/Home.svg';
import addIcon from '../assets/Add.svg';
import listIcon from '../assets/List.svg';
import settingsIcon from '../assets/Settings.svg';
import profileIcon from '../assets/Profile.svg';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Totally Secure Logo" />
        <h2>Totally $ecure</h2>
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => navigate('/userdashboard')}>
          <img src={homeIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </li>
        <li onClick={() => navigate('/transactions')}>
          <img src={addIcon} alt="New Transaction" />
          <span>New Transaction</span>
        </li>
        <li onClick={() => navigate('/history')}>
          <img src={listIcon} alt="Transaction History" />
          <span>Transaction History</span>
        </li>
        <li onClick={() => navigate('/profile')}>
          <img src={settingsIcon} alt="Settings" />
          <span>Profile/Settings</span>
        </li>
      </ul>

      <div className="sidebar-user" onClick={() => navigate('/login')}>
        <img src={profileIcon} alt="User Icon" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
