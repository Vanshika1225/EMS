// // App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
// import Home from './components/Home';
import Employee from './components/Employee';
// import AddEmployee from './components/AddEmployee';
// import Attendance from './components/Attendance'; // Import Attendance component
// import Performance from './components/Performance';
// import Leave from './components/Leave';
import AddEmployee from './components/AddEmployee';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default route redirects to the dashboard */}
//         {/* <Route path='/' element={<Dashboard />}>
//           <Route index element={<Home />} />
//           <Route path='/employee' element={<Employee />} />
//           <Route path='/attendance' element={<Attendance />} /> {/* Render Attendance component */}
//           <Route path='leave/*' element={<Leave />} />
//           <Route path='performance/*' element={<Performance />} />
//           <Route path='AddEmployee/*' element={<AddEmployee />} />
//         </Route>
//         {/* Login route */}
//         <Route path='/auth/login' element={<LoginForm />} />
//         {/* Signup route */}
//         <Route path='/auth/signup' element={<SignupForm />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/AddEmployee" element={<AddEmployee />}></Route>
          </Route>

          <Route path='/auth/login' element={<LoginForm />} />
          <Route path='/auth/signup' element={<SignupForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;



