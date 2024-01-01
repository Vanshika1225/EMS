const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },  
  status: {
    type: String,
    enum: ["Absent", "Present", "Half-Day"],
    default: "Absent",
  },
});
const Attendance = mongoose.model("Attendance", attendenceSchema);
module.exports = Attendance;
