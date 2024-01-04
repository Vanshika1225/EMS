// // App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
// import Home from './components/Home';
import Employee from './components/Employee';
import Attendance from './components/Attendance';
import AddAttendance from './components/AddAttendance';// import Performance from './components/Performance';
// import Leave from './components/Leave';
import AddEmployee from './components/AddEmployee';



function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/AddEmployee" element={<AddEmployee />}></Route>
            <Route path="/dashboard/attendance" element={<Attendance />} />
            <Route path="/dashboard/addAttendance" element={<AddAttendance />} />
      
          </Route>

          <Route path='/auth/login' element={<LoginForm />} />
          <Route path='/auth/signup' element={<SignupForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;



