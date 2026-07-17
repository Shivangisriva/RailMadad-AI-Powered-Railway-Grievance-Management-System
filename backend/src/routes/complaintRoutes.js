const express = require("express");

const {
  createComplaint,
  getComplaints,
  getComplaintById,
  trackComplaint,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaints);
router.get("/track/:trackingId", trackComplaint);
router.get("/:id", getComplaintById);
router.put("/:id/status", updateComplaintStatus);

module.exports = router;