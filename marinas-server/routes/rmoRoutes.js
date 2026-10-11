const express = require("express");
const router = express.Router();
const { ask } = require("../controllers/rmoController");
const { askLimiter } = require("../middleware/rateLimits");

// RMO's AI answers (falls back to the FAQ list on the client when this returns 503)
router.post("/ask", askLimiter, ask);

module.exports = router;
