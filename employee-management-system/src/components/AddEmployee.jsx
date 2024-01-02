import React ,{useState} from 'react'

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        employeeId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        salary: '',
        gender: 'male',
        department: 'developer',
        hiringDate: new Date().toISOString().split('T')[0], // Set hiringDate to today
        startingDate: new Date().toISOString().split('T')[0], // Set startingDate to today
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/api/employees', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Include the JWT token in the headers if the user is logged in
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(employeeData),
          });
      
          if (response.ok) {
            // Employee data successfully submitted
            console.log('Employee data submitted successfully');
            // Reset the form fields after submission
            setEmployeeData({
              employeeId: '',
              firstName: '',
              middleName: '',
              lastName: '',
              salary: '',
              gender: 'female',
              department: 'hr',
              hiringDate: '',
              startingDate: '',
            });
          } else {
            // Handle error cases
            console.error('Error submitting employee data:', response.statusText);
            // You might want to show an error message to the user
          }
        } catch (error) {
          console.error('Error submitting employee data:', error.message);
          // Handle other errors
          // You might want to show an error message to the user
        }
      };
      
  return (
    <div className='AddEmp'>
      <div className='AddEmp-inner'>
        <h2>Add Employee</h2>
        <form onChange={handleSubmit}>
          <div>
            <label htmlFor="employeeId">EmployeeId:</label>
            <input
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee Id"
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="middleName">Middle Name :</label>
            <input
              type="text"
              name="middleName"
              value={employeeData.middleName}
              onChange={handleChange}
              placeholder="Enter Middle Name"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name :</label>
            <input
              type="text"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div>
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
              placeholder="Enter Salary"
              required
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
            >
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
              <option value="hr">HR</option>
            </select>
          </div>
          {/* Add date pickers for hiringDate and startingDate */}
          {/* ...
              You may use a date picker library or input type="date"
              for these fields depending on your preference.
          */}
          <div>
            <label htmlFor="hiringDate">Hiring Date:</label>
            <input
              type="date"
              name="hiringDate"
              value={employeeData.hiringDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="startingDate">Starting Date:</label>
            <input
              type="date"
              name="startingDate"
              value={employeeData.startingDate}
              onChange={handleChange}
              required
            />
          </div>
          <div >
            <label htmlFor="role">Role</label>
            <select
              name="role"
              value={employeeData.role}>
              <option value="user">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
