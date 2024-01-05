import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const AddEmployee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    salary: '',
    gender: 'male',
    department: 'developer',
    hiringDate: new Date().toISOString().split('T')[0],
    startingDate: new Date().toISOString().split('T')[0],
    role:'user'
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
      const response = await fetch('http://localhost:3000/dashboard/AddEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        console.log('Employee data submitted successfully');
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
        navigate('/dashboard/employee');
      } else {
        console.error('Error submitting employee data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting employee data:', error.message);
    }
  };

      
  return (
    <div className='AddEmp'>
      <div className='AddEmp-inner'>
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="Input-field">
            <label htmlFor="employeeId">EmployeeId: </label>
            <input
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee Id"
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              name="firstName"
              value={employeeData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="middleName">Middle Name: </label>
            <input
              type="text"
              name="middleName"
              value={employeeData.middleName}
              onChange={handleChange}
              placeholder="Enter Middle Name"
            />
          </div>
          <div className="Input-field">
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={employeeData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="salary">Salary: </label>
            <input
              type="text"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
              placeholder="Enter Salary"
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="gender">Gender: </label>
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
          <div className="Input-field">
            <label htmlFor="department">Department: </label>
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
          <div className="Input-field">
            <label htmlFor="hiringDate">Hiring Date:  </label>
            <input
              type="date"
              name="hiringDate"
              value={employeeData.hiringDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="startingDate">Starting Date: </label>
            <input
              type="date"
              name="startingDate"
              value={employeeData.startingDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="Input-field">
            <label htmlFor="role">Role: </label>
            <select
              name="role"
              value={employeeData.role}>
              <option value="user">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="Button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
