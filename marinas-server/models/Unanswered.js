const mongoose = require("mongoose");

// Questions Radyo couldn't answer, for Rafael to review (Phase 9)
const unansweredSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true, maxlength: 300 },
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Unanswered || mongoose.model("Unanswered", unansweredSchema);
