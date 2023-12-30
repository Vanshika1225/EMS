import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../Login.css';

const LoginForm = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Add a class to the body element when the component mounts
    document.body.classList.add('login-page');

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

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
    <>
    <div>
       <h1 className="employee-heading">Employee Management System</h1>
    </div>
    <div className="login-container"> 
      <div className="background-container">
      </div>
      
      <div>
        <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
        <h2>Login</h2>
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
          <button type='submit'>Submit</button>
          <div className="signup-link dis">
            <input type='checkbox' name='tick' id='tick' />
            <label htmlFor="password" className="margin">You agree with the terms & conditions</label>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <Link to="/auth/signup">Sign up here</Link></p>
          </div>
        </form>
      </div>
    </div>
</>
  );
};
export default LoginForm;
