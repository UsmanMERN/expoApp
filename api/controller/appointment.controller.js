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

exports.getAppontmentsByPatientId = async (req, res) => {
    try {
      // Extract user data from the request body
      const {patientId } = req.body;
  
      // Create a new user document
      const appointments = await Appointment.find({patientId})
  
  
      res.status(201).json({ message: "Appointment Fetched",data:appointments });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Appointment Fetched patient", error: error.message });
    }
  };

  exports.getAppontmentsByDoctorName = async (req, res) => {
    try {
      const {doctorName } = req.body;
  
      const appointments = await Appointment.find({doctorName})
  
  
      res.status(201).json({ message: "Appointment Fetched",data:appointments });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Appointment Fetched doctor", error: error.message });
    }
  };
  
  
