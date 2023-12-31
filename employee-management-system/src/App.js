import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import Attendance from './components/Attendance';
import Performance from './components/Performance';
import Leave from './components/Leave';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to the dashboard */}
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='attendance' element={<Attendance />} />
          <Route path='leave' element={<Leave />} />
          <Route path='performance' element={<Performance />} />
        </Route>
        {/* Login route */}
        <Route path='/auth/login' element={<LoginForm />} />
        {/* Signup route */}
        <Route path='/auth/signup' element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
