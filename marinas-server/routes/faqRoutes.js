const express = require("express");
const router = express.Router();
const {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  logUnanswered,
  getUnanswered,
  updateUnanswered,
} = require("../controllers/faqController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { questionLimiter } = require("../middleware/rateLimits");

const admin = [requireAuth, requireAdmin];

// Unanswered questions (declared before /:id so "unanswered" isn't read as an id)
router.post("/unanswered", questionLimiter, logUnanswered);
router.get("/unanswered", ...admin, getUnanswered);
router.patch("/unanswered/:id", ...admin, updateUnanswered);

// FAQs
router.get("/", getFaqs);
router.post("/", ...admin, createFaq);
router.put("/:id", ...admin, updateFaq);
router.delete("/:id", ...admin, deleteFaq);

module.exports = router;
