// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.controller');

// Register a new doctor
router.post('/register', doctorController.registerDoctor);
router.post('/getAllDoctors', doctorController.getAllDoctors);
router.post('/getDoctorByName', doctorController.getDoctorByName);

module.exports = router;
