const Appointment = require("../Models/Appointment.model");

// Create a new user
exports.addAppointment = async (req, res) => {
  try {
    // Extract user data from the request body
    const { date, time, doctorName,additionalInformation,patientId } = req.body;

    // Create a new user document
    const appointment = new Appointment({ date, time, doctorName,additionalInformation,patientId });

    // Save the user to the database
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
