const express = require("express");
const router = express.Router();
const { getArticles, getArticleByName, createArticle } = require("../controllers/articleController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

router.get("/", getArticles);
router.post("/", requireAuth, requireAdmin, createArticle);
router.get("/:name", getArticleByName);

module.exports = router;
