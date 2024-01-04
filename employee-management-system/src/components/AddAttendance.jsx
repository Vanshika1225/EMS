// AddAttendance.js
import React, { useState } from 'react';
import '../attendance.css'
const AddAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:30001/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        console.log('Attendance recorded successfully');
        // Reset the form fields after submission
        setAttendanceData({
          employeeId: '',
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        console.error('Error recording attendance:', response.statusText);
      }
    } catch (error) {
      console.error('Error recording attendance:', error.message);
    }
  };

  return (
    <div className='addAttendance'>
      <h2>Add Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='employeeId'>Employee ID:</label>
          <input
            type='text'
            name='employeeId'
            value={attendanceData.employeeId}
            onChange={handleChange}
            placeholder='Enter Employee ID'
            required
          />
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            name='date'
            value={attendanceData.date}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields as needed */}
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAttendance;