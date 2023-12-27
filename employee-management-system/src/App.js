// import { Router } from 'express';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import React from 'react'
import Dashboard from './components/Dashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

function App(){
  return(
    <BrowserRouter>
       <Routes>
        <Route path='/auth/login' element={<LoginForm />}></Route>
        <Route path='/auth/signup' element={<SignupForm />} />
        <Route path='dashboard' element={<Dashboard />}></Route>
       </Routes>
    </BrowserRouter>
  )
}


export default App;
