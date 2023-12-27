import React from 'react'
import {Link} from 'react-router-dom';
const Dashboard = () => {
  return (
    <div>
      <div>
        <div>
          <div>
              <Link to="/dashboard">CWC</Link>
              <ul>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/dashboard">Manage Employees</Link>
                </li>
                <li>
                  <Link to="/dashboard">Attendance</Link>
                </li>
                <li>
                  <Link to="/dashboard">Leave</Link>
                </li>
                <li>
                  <Link to="/dashboard">Performance</Link>
                </li>
                <li>
                  <Link to="/dashboard">Logout</Link>
                </li>
              </ul>
          </div>
        </div>
        <div>
          <div>
            <h4>Employee Management System</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
