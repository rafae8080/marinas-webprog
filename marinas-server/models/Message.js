const mongoose = require("mongoose");

// Contact form messages (Phase 8)
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },
    subject: { type: String, trim: true, maxlength: 120, default: "" },
    body: { type: String, required: true, trim: true, minlength: 10, maxlength: 4000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);
