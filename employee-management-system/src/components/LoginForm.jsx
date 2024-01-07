// LoginForm.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Login.css";

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "", // Change from 'usernameOrEmail' to 'email'
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/auth/login", values)
      .then((result) => {
        const { token } = result.data;
        // Save the token to localStorage or a secure storage mechanism
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h1 className="employee-heading">Employee Management System</h1>
      </div>
      <div className="login-container">
        <div className="background-container"></div>
        <div>
          <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
            <div className="signup-link">
              <p>
                Don't have an account?{" "}
                <Link to="/auth/signup">Sign up here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
