import React from "react";
import Sidebar from "../components/Sidebar";
import NotificationCard from "../components/NotificationCard";
import '../styles/Notifications.css';

const Notifications = () => {
  const notifications = [
    { id: 1, title: "Payment Received", message: "R500 was added to your account.", date: "09/10/2025" },
    { id: 2, title: "Transfer Sent", message: "You sent R200 to Jane Doe.", date: "08/10/2025" },
    { id: 3, title: "Security Alert", message: "New login from an unrecognized device.", date: "07/10/2025" },
  ];

  return (
    <div className="notifications-wrapper">
      <Sidebar />

      <div className="notifications-main">
        <div className="notifications-header">
          <h1>Notifications</h1>
          <p>
            Stay updated with the latest activity on your account.
            Here you'll see alerts about recent transactions, approvals and security updates.
            Manage your notifications easily and never miss an important update.
          </p>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <p>No notifications at the moment.</p>
          ) : (
            notifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                title={notif.title}
                message={notif.message}
                date={notif.date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
