import { Router } from 'express';
import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Router path="/login" component={Login} />
        <Router path="/signup" component={Signup} />
        <Router path="/dashboard" component={Dashboard} />
        <Router path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
