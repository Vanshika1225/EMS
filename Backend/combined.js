// const mongoose = require("mongoose");

// const combined = new mongoose.Schema({
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Employee",
//     required: true,
//   },
//   attendance:[
//     {
//       checkInTime:{
//         type:Date,
//         required:true
//       },
//       checkOutTime:{
//         type:Date
//       },
//       date:{
//         type:Date,
//         required:true
//       },
//     },
//   ],
//   leave:[
//     {
//       leaveStartDate:{
//         type:Date,
//         required:true
//       },
//       leaveEndDate:{
//         type:Date,
//         required:true
//       },
//       leaveType:String,
//       status:String,
//     },
//   ],
//   salary:[
//     {
//       salaryAmount:{
//         type:Number,
//         required:true
//       },
//       salaryDate:{
//         type:Date,
//         required:true
//       },
//       deduction:{
//         type:Number,
//         default:0
//       },
//     },
//   ],
// });

// const combinedModel = mongoose.model("Combined", combined);
// module.exports = combinedModel;
