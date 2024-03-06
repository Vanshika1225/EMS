// SignupForm.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Signup.css";

const SignupForm = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      console.log("Request payload:", values);
      await axios.post("http://localhost:3000/auth/signup", values);
      navigate("/auth/login"); // Redirect to login after successful signup
    } catch (err) {
      console.error("Error:", err);
      setError("Error signing up. Please try again later.");
    }
  };

  return (
    <>
      <div className="background">
        {/* <h1 className="employee-heading">Employee Management System</h1> */}
      </div>
      <div className="signup-container">
        <div className="background-container"></div>
        <div>
          <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={values.role}
                onChange={(e) => setValues({ ...values, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="login-link">
              <p>
                Already have an account?{" "}
                <Link to="/auth/login">Log in here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
