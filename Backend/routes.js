require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Employee = require("./employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("./user.js"); // Make sure to use the correct file path
const Performance = require("./performance");
const Leave = require("./leave");
const Attendance = require("./attendence.js");

router.use(bodyParser.json());
const secretKey = process.env.JWT_SECRET_KEY || "default_secret_key";
console.log(secretKey);

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  console.log("User Role:", req.user.role);
  if (req.user && req.user.role === "admin") {
    next(); // Allow admin to proceed to the next middleware
  } else {
    res.status(403).send({ error: "Permission denied. Admins only." });
  }
};

const validateEmail = (email) => {
  // Email validation regex (you can adjust it as needed)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username, role } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword, username, role: role || 'user' });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, hashedPassword } = req.body;
    console.log(email,hashedPassword)
    // Find user by email
    const user = await User.findOne({ email });
    console.log(user)
    // If user not found, send error response
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
console.log(user.password)
    // Compare the provided password with the hashed password stored in the database
    // const passwordMatch = await bcrypt.compare(password, ser.password);

    // If passwords do not match, send error response
    if (hashedPassword != User.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Employee
router.post("/", async (req, res) => {
  console.log("Request received at /dashboard/employee");

  try {
    // Ensure req.user exists and has the expected properties
    const createdBy = req.user && req.user._id ? req.user._id : null;

    const newEmployee = new Employee({
      ...req.body,
      createdBy,
    });

    // Validate the employee data
    await newEmployee.validate();

    // Save the employee to the database
    await newEmployee.save();

    // Send a proper JSON response with the new employee data
    res.status(201).json({ data: newEmployee });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Send a 400 Bad Request response for validation errors
      res.status(400).json({ error: error.message });
    } else {
      // Send a 500 Internal Server Error response for other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// GET route for users
router.get("/", async (req, res) => {
  try {
    if (req.user && req.user.role === "admin") {
      const employees = await Employee.find();
      res.send(employees);
    } else {
      const employee = await Employee.findOne({ _id: req.user._id });
      res.send(employee);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE route for admins
router.delete("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;

    console.log("User details:", req.user);

    // Check if the user is an admin or the owner of the employee record
    if (req.user.role === "admin" || req.user._id.equals(employeeId)) {
      const result = await Employee.deleteOne({ _id: employeeId });

      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Employee not found" });
      }

      return res.status(204).send();
    } else {
      return res.status(403).send({ error: "Permission denied. Admins only." });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Update employee
router.put("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);

    if (req.user) {
      if (req.user.role === "admin" || req.user._id === employee.createdBy) {
        const updateEmployee = await Employee.findByIdAndUpdate(
          employeeId,
          req.body,
          { new: true }
        );

        if (!updateEmployee) {
          return res.status(404).json({ error: "Employee not found" });
        }

        res.status(200).send(updateEmployee);
      } else {
        res.status(403).send({
          error: "Permission denied. You can update only your own entry.",
        });
      }
    } else {
      res.status(401).send({ error: "Unauthorized. Please login first." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Create performance and ratings for an employee (admin only)
router.post("/:employeeId/performance", isAdmin, async (req, res) => {
  console.log(req.user);
  try {
    const { employeeId } = req.params;
    const { performance, rating } = req.body;

    // Create performance and ratings
    const newPerformance = new Performance({
      employee: employeeId,
      performance,
      rating,
    });

    // Ensure that only admins can create performance records
    if (req.user && req.user.role !== "admin") {
      return res.status(403).send({ error: "Permission denied. Admins only." });
    }

    await newPerformance.save();

    // Update employee with performance reference
    await Employee.findByIdAndUpdate(
      employeeId,
      { $set: { performance: newPerformance._id } },
      { new: true }
    );

    res.status(201).send(newPerformance);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Get performance and ratings for an employee
router.get("/:employeeId/performance", async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Check if the user is an admin or the employee requesting their own performance
    if (req.user.role === "admin" || req.user._id === employeeId) {
      // Retrieve performance and ratings
      const performance = await Performance.findOne({ employee: employeeId });

      res.status(200).send(performance);
    } else {
      res
        .status(403)
        .send({ error: "Permission denied. Admins or the employee only." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Update performance and ratings for an employee (admin only)
router.put("/:employeeId/performance", isAdmin, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { performance, rating } = req.body;

    // Update performance and ratings
    const updatedPerformance = await Performance.findOneAndUpdate(
      { employee: employeeId },
      { $set: { performance, rating } },
      { new: true }
    );

    res.status(200).send(updatedPerformance);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Delete performance and ratings for an employee (admin only)
router.delete("/:employeeId/performance", isAdmin, async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Delete performance and ratings
    await Performance.findOneAndDelete({ employee: employeeId });

    // Remove the reference from the employee
    await Employee.findByIdAndUpdate(
      employeeId,
      { $unset: { performance: 1 } },
      { new: true }
    );

    res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Create leave request
router.post("/leaves", async (req, res) => {
  try {
    const createdBy = req.user ? req.user._id : null;
    const { startDate, endDate, ...otherLeaveData } = req.body;

    // Check if the end date is after the start date
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ error: "End date must be after the start date" });
    }

    const newLeave = new Leave({
      ...otherLeaveData,
      startDate,
      endDate,
      createdBy,
    });

    await newLeave.validate();
    await newLeave.save();
    res.status(201).send(newLeave);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send(error);
    }
  }
});


// get leave request
router.get("/leaves", async (req, res) => {
  try {
    const createdBy = req.user ? req.user._id : null;
    const leaves = await Leave.find({ createdBy });
    res.send(leaves);
  } catch (error) {
    res.status(500).send(error);
  }
});

// approave or reject leave request (admin only)
router.put("/leaves/:leaveId", async (req, res) => {
  console.log('Update leave route reached');
  try {
    const { leaveId } = req.params;
    const { status, approvedBy } = req.body;
    console.log('leaveId:', leaveId);
    console.log('status:', status);
    console.log('approvedBy:', approvedBy);
    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      { $set: { status, approvedBy } },
      { new: true }
    );

    res.status(200).send(updatedLeave);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

// Delete leave request (admin only)
router.delete("/leaves/:leaveId", async (req, res) => {
  try {
    const { leaveId } = req.params;
    await Leave.findByIdAndDelete(leaveId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// create attendance
router.post('/attendance', async (req, res) => {
  try {
    const { employeeId, date } = req.body;

    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    console.log(employee)
    if (!employee) {
      return res.status(400).json({ error: 'Employee does not exist' });
    }

    // Check if the attendance already exists for the given date
    const existingAttendance = await Attendance.findOne({ employee: employeeId, date });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already recorded for this date' });
    }

    // Create and save new attendance record
    const newAttendance = new Attendance({
      employee: employeeId,
      date,
    });

    await newAttendance.save();

    // Send success response
    return res.status(201).json({ message: 'Attendance recorded successfully!' });
  } catch (error) {
    console.error('Error:', error);

    // Handle other errors and send an appropriate response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get attendance records
router.get('/attendance',async(req,res)=> {
  try{
    const attendenceRecords=await Attendance.find().populate('employeeId');
    res.status(200).json(attendenceRecords);
  }catch(error){
    console.log("Error: ",error);
    res.status(500).json({error:'Internal Server Error'});
  }
});

// update attendance record (admin only)
router.put('/attendance/:attendanceId',isAdmin,async(req,res)=>{
  try{
    const {attendanceId}=req.params;
    const {date}=req.body;
    // Check if the attendance record exists
    const attendance=await Attendance.findById(attendanceId);
    if(!attendance){
      return res.status(404).json({message:"Attendance not found"})
    }
    attendance.date=date;
    await attendance.save();
    res.status(200).json({message:'Attendance record updated successfully!'})
  }catch(error){
    console.log("Error: ",error);
    res.status(500).json({error:'Internal Server Error'});
  }
})

// Delete attendance record
router.delete('/attendance/:attendanceId', isAdmin , async (req, res) =>{
  try{
    const {attendanceId}=req.params;
    // Check if the attendance record exists
    const attendance=await Attendance.findById(attendanceId);
    if(!attendance){
      return res.status(404).json({message:"Attendance not found"})
    }
    await Attendance.findByIdAndDelete(attendanceId);
    res.status(204).json({message:`Deleted Attendance Record with id ${attendanceId}`})
  }catch(error){
    console.log("Error: ",error);
    res.status(500).json({error:'Internal Server Error'});
  }
});

module.exports = router;
