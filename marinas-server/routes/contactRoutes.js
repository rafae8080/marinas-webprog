const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} = require("../controllers/contactController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { formLimiter } = require("../middleware/rateLimits");

// Public contact form
router.post("/", formLimiter, createMessage);

// Admin inbox
router.get("/", requireAuth, requireAdmin, getMessages);
router.patch("/:id", requireAuth, requireAdmin, updateMessage);
router.delete("/:id", requireAuth, requireAdmin, deleteMessage);

module.exports = router;
