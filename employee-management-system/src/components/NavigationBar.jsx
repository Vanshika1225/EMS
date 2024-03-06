// NavigationBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar({ isLoggedIn, handleLogout }) {
  return (
    <div className="navbar1">
      {isLoggedIn ? (
        // Show profile icon when logged in
        <div className="profile-icon" onClick={handleLogout}><i className="bi bi-person-circle"></i></div>
      ) : (
        // Show login and signup links when not logged in
        <>
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/signup" className="signup">Signup</Link>
        </>
      )}
    </div>
  );
}

export default NavigationBar;
