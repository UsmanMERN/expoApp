// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');

// Register a new doctor
router.post('/register', doctorController.registerDoctor);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/search', doctorController.getDoctorByName);

module.exports = router;
