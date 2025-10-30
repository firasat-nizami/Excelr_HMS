import React from 'react';
import { formatDate, formatTime } from '../utils/format';

const Dashboard = ({ appointments = [] }) => {
  const todayStr = new Date().toISOString().slice(0, 10);

  const todays = appointments.filter(a => a.date === todayStr);

  // Count statuses
  const statusCount = { Pending: 0, Confirmed: 0, Cancelled: 0 };
  todays.forEach(a => {
    if (statusCount[a.status] !== undefined) statusCount[a.status]++;
  });

  // Badge colors
  const statusBadge = status => {
    switch (status) {
      case 'Confirmed':
        return 'badge badge-confirmed';
      case 'Pending':
        return 'badge badge-pending';
      case 'Cancelled':
        return 'badge badge-cancelled';
      default:
        return 'badge';
    }
  };

  return (
    <div className="main-content">
      <h2>Dashboard</h2>

      {/* Cards */}
      <div className="grid-2" style={{ marginTop: 12 }}>
        <div className="card">
          <h4>Today's Appointments</h4>
          <p className="stat-number">{todays.length}</p>
        </div>
        <div className="card">
          <h4>Total Appointments</h4>
          <p className="stat-number">{appointments.length}</p>
        </div>
        <div className="card">
          <h4>Confirmed Today</h4>
          <p className="stat-number">{statusCount.Confirmed}</p>
        </div>
        <div className="card">
          <h4>Pending Today</h4>
          <p className="stat-number">{statusCount.Pending}</p>
        </div>
      </div>

      {/* Today's Appointments Table */}
      <div style={{ marginTop: 16 }} className="card">
        <h4>Today's Appointment Details</h4>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todays.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '12px' }}>
                  No appointments for today
                </td>
              </tr>
            ) : (
              todays.map(a => (
                <tr key={a.id}>
                  <td>{a.patient}</td>
                  <td>{formatDate(a.date)}</td>
                  <td>{formatTime(a.time)}</td>
                  <td>
                    <span className={statusBadge(a.status)}>{a.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
