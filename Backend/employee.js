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
  gender:{
    type:String,
    enum:['Male','Female','Transgender'],
    default:'Female'
  },
  Department:{
    type:String,
    enum:['Developer','Tester','HR'],
    default:'HR',
    required:true,
  },
  hiringDate:{
    type:Date,
    required:true,
  },
  startingDate:{
    type:Date,
    required:true,
  },
  position: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
