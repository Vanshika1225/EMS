require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Employee = require("./employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.js"); // Make sure to use the correct file path
const Performance = require("./performance");
const Leave = require("./leave");
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

// Signup endpoint
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint

router.post("/login", async (req, res) => {
  try {
    console.log("Login request received");
    const { username, password } = req.body;

    // Check if user already exists or not
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // Hash the password and compare
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    // Ensure that secretKey is defined
    if (!secretKey) {
      console.error("JWT secret key is missing or invalid.");
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      // Create a new JWT token
      const token = jwt.sign(
        { username: foundUser.username, role: foundUser.role },
        secretKey
      );

      // Send the token in the response
      console.log("Login successful");
      res.status(200).json({ token });
    } catch (error) {
      console.log("JWT Sign Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Employee
router.post("/", async (req, res) => {
  try {
    const createdBy = req.user ? req.user._id : null;
    const newEmployee = new Employee({
      ...req.body,
      createdBy,
    });
    await newEmployee.validate();
    await newEmployee.save();
    res.status(201).send(newEmployee);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send(error);
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
    // console.log("Request object:", req);  // Log the entire request object

    const { employeeId } = req.params;

    if (req.user.role === "admin" || req.user._id === employeeId) {
      await Employee.deleteOne({ _id: employeeId });
      return res.status(204).send();
    } else {
      return res.status(403).send({ error: "Permission denied. Admins only." });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// update employee
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
          error: "Permission denied, You can update only your own entry",
        });
      }
    } else {
      res.status(401).send({ error: "Unauthorized, Please login first" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});
("");

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
    await Performance.findOneAndRemove({ employee: employeeId });

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
    const newLeave = new Leave({
      ...req.body,
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

module.exports = router;
