const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    trainNumber: {
      type: String,
      trim: true,
    },
    pnr: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: "Unassigned",
    },
    priority: {
      type: String,
      default: "Low",
    },
    department: {
      type: String,
      default: "Pending",
    },
    status: {
      type: String,
      default: "Submitted",
      enum: ["Submitted", "In Progress", "Resolved", "Rejected"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Complaint", complaintSchema);