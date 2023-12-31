import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Signup.css';

const SignupForm = () => {
  const [values, setValues] = useState({
    email: '', // Change "username" to "email"
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add a class to the body element when the component mounts
    document.body.classList.add('signup-page');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('signup-page');
    };
  }, []);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      console.log('Request payload:', values);
      await axios.post('http://localhost:3000/auth/signup', values);
      navigate('/auth/login'); // Redirect to login after successful signup
    } catch (err) {
      console.error('Error:', err);

      if (err.response) {
        console.error('Server response data:', err.response.data);
        console.error('Server response status:', err.response.status);

        // Display more specific error messages based on the server response
        if (err.response.status === 400) {
          setError('Invalid data. Please check your input.');
        } else if (err.response.status === 401) {
          setError('Unauthorized. Please check your credentials.');
        } else {
          setError('Error signing up. Please try again later.');
        }
      } else if (err.request) {
        console.error('No response received from the server');
        setError('No response received from the server. Please try again later.');
      } else {
        console.error('Error setting up the request:', err.message);
        setError('Error setting up the request. Please try again later.');
      }
    }
  };

  return (
    <>
    <div>
       <h1 className="employee-heading">Employee Management System</h1>
    </div>
    <div className="signup-container">
      <div className="background-container"></div>
      <div>
        <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="email">Email</label> {/* Change "username" to "email" */}
            <input
              type="email"
              name="email" // Change "username" to "email"
              placeholder="Enter your email" // Change "username" to "email"
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
          <button type='submit'>Sign Up</button>
          <div className="login-link">
            <p>Already have an account? <Link to="/auth/login">Log in here</Link></p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignupForm;
