// Dashboard.jsx

import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; 
import NavigationBar from './NavigationBar';
import '../dashboard.css';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initially user is not logged in
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Clear authentication tokens and reset isLoggedIn state
    setIsLoggedIn(false);

    // Clear authentication token from local storage
    localStorage.removeItem('token');

    // Redirect to signup page after logout
    navigate('/auth/signup');
  };

  return (
    <div>
      <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="sidebar-container">
          <Link to="/dashboard" className="a">
            Dashboard
          </Link>
          <div className="navbar">
            <ul>
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
            </ul>
          </div>
        </div>
        <div className="top-container">
          <div>
            <h4>Employee Management System</h4>
          </div>
          <NavigationBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
