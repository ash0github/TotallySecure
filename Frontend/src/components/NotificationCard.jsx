import React from "react";
import '../styles/Notifications.css';
import notificationIcon from '../assets/notificationIcon.svg';

const NotificationCard = ({ title, message, date }) => {
  return (
    <div className="notification-card">
      <div className="notification-card-content">
        <img src={notificationIcon} alt="Notification Icon" className="notification-icon" />
        <div className="notification-text">
          <h3>{title}</h3>
          <p>{message}</p>
          <span className="notification-date">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;