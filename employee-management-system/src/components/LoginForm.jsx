import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/auth/login', values)
      .then(result => {
        navigate('/dashboard');
      })
      .catch(err => {
        setError('Invalid username or password. Please try again.'); // Set error message
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type="text"
              name='username'
              placeholder='Enter your username'
              onChange={(e) => setValues({ ...values, username: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              name='password'
              placeholder='Enter your password'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <button type='submit'>Submit</button>
          <div>
            <input type='checkbox' name='tick' id='tick' />
            <label htmlFor="password">You agree with the terms & conditions</label>
          </div>
          <div>
            <p>Don't have an account? <Link to="/SignupForm">Sign up here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
