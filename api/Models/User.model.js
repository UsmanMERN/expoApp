const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  specialty: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  acceptTerms: {
    type: Boolean,
    required: true,
  },
});

// Add a method to the user schema to find a user by email
userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({ email });
  return user;
};

module.exports = mongoose.model("User", userSchema);
