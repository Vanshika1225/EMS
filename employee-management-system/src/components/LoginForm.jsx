import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../Login.css";

const LoginForm = () => {
  const [values, setValues] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
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
        navigate("/");
      })
      .catch((err) => {
        setError("Invalid username or password. Please try again.");
        console.log(err);
      });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input
                type="text"
                name="usernameOrEmail"
                placeholder="Enter your username or email"
                onChange={(e) =>
                  setValues({ ...values, usernameOrEmail: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
                {/* Eye button to toggle password visibility */}
                <button
                  type="button"
                  className="eye-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn">Submit</button>
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
