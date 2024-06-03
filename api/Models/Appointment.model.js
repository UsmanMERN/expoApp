const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
  },
  status: {
    type: String,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location'
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  },
  doctorName: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});


module.exports = mongoose.model("appointment", appointmentSchema);
