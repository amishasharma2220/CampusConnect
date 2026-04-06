const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);