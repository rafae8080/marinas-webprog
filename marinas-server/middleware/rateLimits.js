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

module.exports = { loginLimiter, formLimiter };
