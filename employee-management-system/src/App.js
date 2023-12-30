// import { Router } from 'express';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import React from 'react'
import Dashboard from './components/Dashboard'
import Home from './components/Home';
import Employee from './components/Employee';
import Attendance from './components/Attendance';
import Performance from './components/Leave';
import Leave from './components/Performance';
// import { useNavigate} from 'react-router-dom';
// import {useEffect} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';

function App() {
  // const navigate = useNavigate();

  // // Redirect to login page when the app starts
  // useEffect(() => {
  //   navigate('/auth/login');
  // }, [navigate]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<LoginForm />} />
        <Route path='/auth/signup' element={<SignupForm />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />} /> {/* Corrected path */}
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/attendance' element={<Attendance />} />
          <Route path='/dashboard/leave' element={<Leave />} />
          <Route path='/dashboard/performance' element={<Performance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
