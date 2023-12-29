import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    <div className="signup-container">
    <div className="background-container"></div>
    <div>
      <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
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
  );
};

export default SignupForm;
