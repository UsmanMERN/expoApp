// controllers/doctorController.js
const Doctor = require('../models/Doctor');

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
