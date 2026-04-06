const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.id,
      approvalStatus: "approved"
    });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ approvalStatus: "approved" }).populate("organizer", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register for event
router.post("/register/:eventId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!event) return res.status(404).json({ message: "Event not found" });

    // ✅ FIX: proper ObjectId comparison
    if (event.registeredStudents.some(id => id.toString() === userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // ✅ capacity check
    if (event.registeredStudents.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // ✅ ensure array exists
    if (!user.registeredEvents) {
      user.registeredEvents = [];
    }

    event.registeredStudents.push(userId);
    user.registeredEvents.push(eventId);
    user.eventsAttended += 1;

    await event.save();
    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my events
router.get("/my-events", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await Event.find({
      registeredStudents: userId
    }).populate("organizer", "name email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Unregister from event
router.post("/unregister/:eventId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or user not found" });
    }

    // remove user from event
    event.registeredStudents = event.registeredStudents.filter(
      (id) => id.toString() !== userId
    );

    // remove event from user
    user.registeredEvents = user.registeredEvents.filter(
      (id) => id.toString() !== eventId
    );

    // update stats (optional but good)
    if (user.eventsAttended > 0) {
      user.eventsAttended -= 1;
    }

    await event.save();
    await user.save();

    res.json({ message: "Unregistered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;