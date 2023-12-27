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

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/auth/signup', values)
      .then(result => {
        navigate('/auth/login'); // Redirect to login after successful signup
      })
      .catch(err => {
        setError('Error signing up. Please try again.'); // Set error message
        console.log(err);
      });
  };

  return (
    <div className="signup-container">
      <div className="background-container">
      </div>
      <div>
        <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <input
              type="text"
              name='username'
              placeholder='Enter your username'
              onChange={(e) => setValues({ ...values, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              name='password'
              placeholder='Enter your password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
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
