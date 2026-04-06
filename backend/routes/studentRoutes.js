const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET student stats
router.get("/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      eventsAttended: user.eventsAttended || 0,
      certificatesEarned: user.certificatesEarned || 0
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      name: user.name,
      email: user.email,
      registration_number: user.registration_number,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;