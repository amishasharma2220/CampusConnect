const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
  },
  registrationNumber: {
    type: String,
    required: function () {
      return this.role === "student";
    },
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "club_admin", "admin"],
    default: "student",
  },
  eventsAttended: {
    type: Number,
    default: 0
  },
  certificatesEarned: {
    type: Number,
    default: 0
  },
  profileUpdated: {
    type: Boolean,
    default: false
  },
  registeredEvents: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
