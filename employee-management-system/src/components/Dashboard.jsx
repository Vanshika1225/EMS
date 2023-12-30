import React from 'react'
import {Link,Outlet} from 'react-router-dom';
import '../dashboard.css'
const Dashboard = () => {
  return (
    <div>
      <div>
        <div className="sidebar-container">
              <Link to="/dashboard" className="a">CWC</Link>
          <div className="navbar">
              <ul>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard/employee">Manage Employees</Link>
                </li>
                <li>
                  <Link to="/dashboard/attendance">Attendance</Link>
                </li>
                <li>
                  <Link to="/dashboard/leave">Leave</Link>
                </li>
                <li>
                  <Link to="/dashboard/performance">Performance</Link>
                </li>
                <li>
                  <Link to="/dashboard">Logout</Link>
                </li>
              </ul>
          </div>
        </div>
        <div className="top-container">
          <div>
            <h4>Employee Management System</h4>
          </div>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
