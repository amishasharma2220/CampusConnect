require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db");

const app = express();
app.set("trust proxy", 1);
const eventRoutes = require("./routes/eventRoutes");

// ✅ Middlewares (order matters)
app.use(helmet()); // basic security headers
app.use(morgan("dev")); // logging
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ DB connection (skip during tests)
if (process.env.NODE_ENV !== "test") {
  connectDB();
}
mongoose.connection.on("connected", () => {
  console.log("Connected DB:", mongoose.connection.name);
});

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "CampusConnect API Running 🚀" });
});
app.head("/", (req, res) => {
  res.status(200).end();
});

// ✅ Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
// Support both /api/auth and /auth for compatibility
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/events", eventRoutes);
app.use("/api/student", require("./routes/studentRoutes"));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.head("/health", (req, res) => {
  res.status(200).end();
});
const PORT = process.env.PORT || 10000;

// ✅ Start server (skip during tests)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;