import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import '../dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="sidebar-container">
          {/* Use the root ("/") route for Dashboard link */}
          <Link to="/" className="a">
           Dashboard
          </Link>
          <div className="navbar">
            <ul>
              <li>
                <Link to="/">
                 Dashboard
                </Link>
              </li>
              <li>
              <Link to="/employee">
                  Manage Employees
                </Link>
              </li>
              <li>
                <Link to="/attendance">
                   Attendance
                </Link>
              </li>
              <li>
                <Link to="/leave">
                  Leave
                </Link>

              </li>
              <li>
                <Link to="/performance">
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
