const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const appointementRoutes = require("./routes/appointmentroute");

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_URI}/expoapp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

// Corrected the app.get method to specify a route
app.get("/", (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointement", appointementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
