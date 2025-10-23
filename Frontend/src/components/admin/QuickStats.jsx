import React from 'react';
import totalUsersIcon from '../../assets/total_users.svg';
import pendingIcon from '../../assets/pending.svg';
import flaggedIcon from '../../assets/flagged.svg';
import '../../styles/Dashboard.css';

const QuickStats = ({ totalUsers, pendingTransactions, flaggedTransactions }) => {
  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: totalUsersIcon,
      className: 'stat-card green',
    },
    {
      label: 'Pending Transactions',
      value: pendingTransactions,
      icon: pendingIcon,
      className: 'stat-card yellow',
    },
    {
      label: 'Flagged Transactions',
      value: flaggedTransactions,
      icon: flaggedIcon,
      className: 'stat-card red',
    },
  ];

  return (
    <section className="quick-stats">
      {stats.map((stat, index) => (
        <div key={index} className={stat.className}>
          <img src={stat.icon} alt={`${stat.label} Icon`} className="stat-icon" />
          <div className="stat-info">
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default QuickStats;