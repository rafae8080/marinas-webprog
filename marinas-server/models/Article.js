const mongoose = require("mongoose");

// Field Notes articles (Phase 10). `name` is the URL slug: /notes/:name
const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 120,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only contain lowercase letters, numbers and hyphens"],
    },
    tag: { type: String, required: true, trim: true, maxlength: 40 },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    cover: { type: String, trim: true, default: "" }, // optional image URL; otherwise a generated cover is used
    alt: { type: String, trim: true, maxlength: 200, default: "" },
    content: {
      type: [{ type: String, trim: true }],
      validate: [(paragraphs) => paragraphs.length > 0, "At least one paragraph is required"],
    },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Article || mongoose.model("Article", articleSchema);
