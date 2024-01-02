// // AttendanceForm.js (Form to record attendance)

// import React, { useState } from 'react';
// import axios from 'axios';

// const AttendanceForm = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [date, setDate] = useState('');

//   const handleRecordAttendance = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a request to record attendance
//       await axios.post('http://localhost:3000/attendance', { employeeId, date });
//       alert('Attendance recorded successfully!');
//     } catch (error) {
//       console.error('Error recording attendance:', error.response.data.error);
//       alert('Failed to record attendance. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Record Attendance</h2>
//       <form onSubmit={handleRecordAttendance}>
//         <label>
//           Employee ID:
//           <input
//             type="text"
//             value={employeeId}
//             onChange={(e) => setEmployeeId(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Date:
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Record Attendance</button>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;
