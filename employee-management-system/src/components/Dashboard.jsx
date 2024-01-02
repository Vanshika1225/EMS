import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
// Dashboard.js

import '../dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="sidebar-container">
          {/* Use the root ("/") route for Dashboard link */}
          <Link to="/dashboard" className="a">
           Dashboard
          </Link>
          <div className="navbar">
            <ul>
              <li>
                <Link to="/dashboard">
                 Dashboard
                </Link>
              </li>
              <li>
              <Link to="/dashboard/employee">
                  Manage Employees
                </Link>
              </li>
              <li>
                <Link to="/dashboard/attendance">
                   Attendance
                </Link>
              </li>
              <li>
                <Link to="/dashboard/leave">
                  Leave
                </Link>

              </li>
              <li>
                <Link to="/dashboard/performance">
                  Performance
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="top-container">
          <div>
            <h4>Employee Management System</h4>
          </div>
          {/* Include the NavigationBar component here */}
          <NavigationBar />
        </div>
      </div>
        <Outlet />
    </div>
  );
};

export default Dashboard;
