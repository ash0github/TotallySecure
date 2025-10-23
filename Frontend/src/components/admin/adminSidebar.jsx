import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.svg';
import homeIcon from '../../assets/Home.svg';
import listIcon from '../../assets/List.svg';
import settingsIcon from '../../assets/Settings.svg';
import profileIcon from '../../assets/Profile.svg';
import bellIcon from '../../assets/bellIcon.png';
import userlistIcon from '../../assets/UserList.svg';
import '../../styles/Sidebar.css';

const adminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Totally Secure Logo" />
        <h2>Totally $ecure</h2>
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => navigate('/admindashboard')}>
          <img src={homeIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </li>
        <li onClick={() => navigate('/userlist')}>
          <img src={userlistIcon} alt="User List" />
          <span>User List</span>
        </li>
        <li onClick={() => navigate('/admintransactions')}>
          <img src={listIcon} alt="Transactions" />
          <span>Transactions</span>
        </li>
        <li onClick={() => navigate('/profile')}>
          <img src={settingsIcon} alt="Settings" />
          <span>Profile/Settings</span>
        </li>
      </ul>

      <div className="sidebar-bottom">
        <div className="sidebar-user-actions">
          <div className="sidebar-user" onClick={() => navigate('/login')}>
            <img src={profileIcon} alt="User Icon" />
            <span>Logout</span>
          </div>

          <div className="sidebar-notifications" onClick={() => navigate("/notifications")}>
            <img src={bellIcon} alt="Notifications" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default adminSidebar;
