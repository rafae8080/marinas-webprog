const rateLimit = require("express-rate-limit");

// Note: these use the default in-memory store. On Vercel serverless each instance
// keeps its own counters and they reset on cold starts, so limits are best-effort.

// Login attempts: 10 per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please try again later." },
});

// Public form submissions: 5 per hour per IP
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many submissions. Please try again later." },
});

// Radyo's unanswered-question log: 20 per hour per IP.
// Separate from formLimiter so asking the bot a few questions never blocks the contact form.
const questionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many questions logged. Please try again later." },
});

// RMO's AI answers: 30 per hour per IP (protects the free AI quota)
const askLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many questions. Please try again later." },
});

module.exports = { loginLimiter, formLimiter, questionLimiter, askLimiter };
