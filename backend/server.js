require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/events", eventRoutes);
app.use(cors());
app.use(express.json());

// ✅ DB connection
connectDB();
mongoose.connection.on("connected", () => {
  console.log("Connected DB:", mongoose.connection.name);
});
// ✅ Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});
// ✅ Start server
app.listen(5001, () => {
  console.log("🚀 Server running on http://localhost:5001");
});