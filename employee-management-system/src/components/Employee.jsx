import React from 'react'
import '../employee.css';
import { Link } from 'react-router-dom';

const Employee = () => {
  
  console.log('Employee component is rendering');
  return (
    <div className='emp'>
      <div className='emp-inner'>
        <h1>Employee List</h1>
      </div>
      <Link to="/AddEmployee" className='btn1'>Add Employee</Link>
    </div>
  )
}

export default Employee
