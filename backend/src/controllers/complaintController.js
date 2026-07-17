const Complaint = require("../models/Complaint");

const buildTrackingId = () => `RM${Date.now()}`;

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, trainNumber, pnr, category, priority, department } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "title and description are required" });
    }

    const trackingId = buildTrackingId();

    const complaint = await Complaint.create({
      trackingId,
      title,
      description,
      trainNumber,
      pnr,
      category,
      priority,
      department,
      status: "Submitted",
    });

    return res.status(201).json(complaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return res.json(complaints);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.trackComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ trackingId: req.params.trackingId });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json({
      trackingId: complaint.trackingId,
      status: complaint.status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    return res.json(complaint);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};