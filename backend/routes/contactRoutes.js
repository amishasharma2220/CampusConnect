const express = require("express");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

// ✅ Prevent model overwrite error
const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      subject,
      message,
    });

    const saved = await newMessage.save();
    console.log("✅ Saved in DB:", saved);

    console.log("----- NEW CONTACT REQUEST -----");
    console.log("📩 Contact Message:", {
      name,
      email,
      subject,
      message,
    });

    res.status(200).json({
      message: "Message received successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;   // ✅ VERY IMPORTANT