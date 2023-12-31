// Inside the Dashboard component or a dedicated NavigationBar component
import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboard.css'; // Import the CSS file

function NavigationBar() {
  return (
    <div className="navbar1">
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/signup" className="signup">Signup</Link>
    </div>
  );
}

export default NavigationBar;