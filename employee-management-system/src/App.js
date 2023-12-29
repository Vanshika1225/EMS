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

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

function App(){
  return(
    <BrowserRouter>
       <Routes>
        <Route path='/auth/login' element={<LoginForm />}></Route>
        <Route path='/auth/signup' element={<SignupForm />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/attendance' element={<Attendance />}></Route>
          <Route path='/dashboard/leave' element={<Leave />}></Route>
          <Route path='/dashboard/performance' element={<Performance />}></Route>
        </Route>
       </Routes>
    </BrowserRouter>
  )
}


export default App;
