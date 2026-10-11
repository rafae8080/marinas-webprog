const mongoose = require("mongoose");

// Radyo FAQ entries (Phase 9)
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true, maxlength: 200, unique: true },
    answer: { type: String, required: true, trim: true, maxlength: 1000 },
    keywords: [{ type: String, trim: true, lowercase: true, maxlength: 40 }],
    links: [
      {
        _id: false,
        label: { type: String, required: true, trim: true, maxlength: 40 },
        url: { type: String, required: true, trim: true, maxlength: 300 },
      },
    ],
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Faq || mongoose.model("Faq", faqSchema);
