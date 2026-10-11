const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { loginLimiter } = require("../middleware/rateLimits");

// Auth
router.post("/login", loginLimiter, loginUser);

// CRUD (admin only)
router.get("/", requireAuth, requireAdmin, getUsers);
router.post("/", requireAuth, requireAdmin, createUser);
router.put("/:id", requireAuth, requireAdmin, updateUser);
router.delete("/:id", requireAuth, requireAdmin, deleteUser);

module.exports = router;
