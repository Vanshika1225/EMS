import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../attendance.css'
const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
    useEffect(() => {
    // Fetch attendance records from the server
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch('/attendance');
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <>
      <div className='attendance'>
        <h1>Attendance Record</h1>
      </div>
      <Link to="/dashboard/AddAttendance" className='btn1'>Add Employee</Link>
      <div>
  {attendanceRecords.map((record) => (
    <li key={record._id}>
      Employee ID: {record.employeeId}, Date: {record.date}
    </li>
  ))}
</div>
    </>
  );
};

export default Attendance;
