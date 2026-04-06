

const Event = require("../models/Event");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      title,
      description,
      date,
      location,
      category,
      capacity,
      organizerName,
      organizerEmail,
      banner
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      capacity,
      organizerName,
      organizerEmail,
      banner,
      organizer: userId,
      registeredStudents: [],
      approvalStatus: "approved"
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event
    });

  } catch (err) {
    console.error("CREATE EVENT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ approvalStatus: "approved" })
      .populate("organizer", "name email");

    res.json(events);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE EVENT
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REGISTER FOR EVENT
exports.registerForEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // prevent duplicate
    if (event.registeredStudents.some(id => id.toString() === userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registeredStudents.push(userId);
    await event.save();

    res.json({ message: "Registered successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};