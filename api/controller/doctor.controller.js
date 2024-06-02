// controllers/doctorController.js
const Doctor = require('../Models/Doctor.model');

exports.registerDoctor = async (req, res) => {
  try {
    const {
      userId, name, categories, location, experience, education,
      languages, bio, rating, reviews, photo
    } = req.body;

    const newDoctor = new Doctor({
        userId, name, categories, location, experience, education,
      languages, bio, rating, reviews, photo
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.status(200).json({message:'Success',data:doctors});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



// Get doctor by name
exports.getDoctorByName = async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ name: req.body.name });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json({message:"Success",data:doctor});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
