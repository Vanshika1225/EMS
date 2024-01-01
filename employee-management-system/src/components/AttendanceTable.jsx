// AttendanceTable.js (Table to display attendance records)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceTable = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/attendance');
  
        // Log the response for debugging
        console.log('Attendance Records Response:', response.data);
  
        setAttendanceRecords(response.data);
      } catch (error) {
        // Log the error for debugging
        console.error('Error fetching attendance records:', error);
  
        // Check if 'error.response' is available and log its details
        if (error.response) {
          console.log('Error Response Data:', error.response.data);
          console.log('Error Response Status:', error.response.status);
        }
  
        setAttendanceRecords([]);
      }
    };
  
    fetchAttendanceRecords();
  }, []);
  

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.employeeId}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
