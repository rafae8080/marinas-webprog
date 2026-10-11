const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const admin = [requireAuth, requireAdmin];

router.get("/", getArticles);
router.post("/", ...admin, createArticle);
router.get("/:name", getArticleByName);
router.put("/:id", ...admin, updateArticle);
router.delete("/:id", ...admin, deleteArticle);

module.exports = router;
