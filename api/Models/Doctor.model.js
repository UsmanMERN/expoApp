const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,ref:'User', required: true },
  name: { type: String, required: true },
  categories: { type: [String], required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
  education: { type: String, required: true },
  languages: { type: [String], required: true },
  bio: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  photo: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
