const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["tech", "cultural", "sports", "academic"],
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    organizerName: {
      type: String,
    },

    organizerEmail: {
      type: String,
    },

    capacity: {
      type: Number,
      default: 100,
      min: 1,
    },

    banner: {
      type: String,
    },

    registeredStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

eventSchema.index({ date: 1 });
eventSchema.index({ approvalStatus: 1 });