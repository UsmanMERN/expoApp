const express = require("express");
const router = express.Router();
const appontmentController = require("../controller/appointment.controller");

// Create a new user
router.post("/addAppointment", appontmentController.addAppointment);
router.post("/getAppontmentsByPatientId", appontmentController.getAppontmentsByPatientId);
router.post("/getAppontmentsByDoctorName", appontmentController.getAppontmentsByDoctorName);

// // Get all users
// router.get("/", appontmentController.getAllUsers);

// // Get a specific user by ID
// router.get("/:email", appontmentController.getUserById);

// // Update a user by ID
// router.put("/:id", appontmentController.updateUser);

// // Delete a user by ID
// router.delete("/:id", appontmentController.deleteUser);

module.exports = router;
