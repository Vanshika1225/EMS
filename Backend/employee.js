const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: String,
  lastName: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0, // Assuming salary should be a non-negative value
  },
  position: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Performance',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
