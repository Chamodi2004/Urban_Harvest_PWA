const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const productRoutes = require("./routes/productRoutes");
const workshopRoutes = require("./routes/workshopRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
  })
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
  });

// Root Route
app.get("/", (req, res) => {
  res.send("Urban Harvest Hub API Running");
});

// API Routes
app.use("/api/events", eventRoutes);
app.use("/api/products", productRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/auth", authRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});