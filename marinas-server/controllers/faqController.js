const mongoose = require("mongoose");
const Faq = require("../models/Faq");
const Unanswered = require("../models/Unanswered");

const clean = (value) => (typeof value === "string" ? value.trim() : "");

// Only the fields an admin may set, normalized
const pickFaq = (body = {}) => {
  const data = {};
  if (body.question !== undefined) data.question = clean(body.question);
  if (body.answer !== undefined) data.answer = clean(body.answer);
  if (Array.isArray(body.keywords)) data.keywords = body.keywords.map(clean).filter(Boolean);
  if (Array.isArray(body.links)) {
    data.links = body.links
      .map((l) => ({ label: clean(l?.label), url: clean(l?.url) }))
      .filter((l) => l.label && l.url);
  }
  if (body.order !== undefined) data.order = Number(body.order) || 0;
  if (typeof body.active === "boolean") data.active = body.active;
  return data;
};

const notFound = (res) => res.status(404).json({ message: "Not found" });

// GET /api/faqs (public): active entries only, cached for 5 minutes
const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({ active: true }, "question answer keywords links order")
      .sort({ order: 1, createdAt: 1 })
      .lean();
    res.set("Cache-Control", "public, max-age=300");
    res.json({ faqs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/faqs (admin)
const createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(pickFaq(req.body));
    res.status(201).json({ faq });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/faqs/:id (admin)
const updateFaq = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, pickFaq(req.body), {
      new: true,
      runValidators: true,
    });
    if (!faq) return notFound(res);
    res.json({ faq });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/faqs/:id (admin)
const deleteFaq = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) return notFound(res);
    res.json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/faqs/unanswered (public, rate-limited)
const logUnanswered = async (req, res) => {
  const text = clean(req.body?.text).slice(0, 300);
  if (text.length < 2) return res.status(400).json({ message: "Question is required." });
  try {
    await Unanswered.create({ text });
    res.status(201).json({ message: "Logged" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/faqs/unanswered (admin): open questions first, newest first
const getUnanswered = async (req, res) => {
  try {
    const questions = await Unanswered.find().sort({ resolved: 1, createdAt: -1 }).lean();
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/faqs/unanswered/:id (admin): set or toggle `resolved`
const updateUnanswered = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
  try {
    const question = await Unanswered.findById(req.params.id);
    if (!question) return notFound(res);
    question.resolved = typeof req.body?.resolved === "boolean" ? req.body.resolved : !question.resolved;
    await question.save();
    res.json({ question });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  logUnanswered,
  getUnanswered,
  updateUnanswered,
};
