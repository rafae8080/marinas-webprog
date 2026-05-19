const express = require("express");
const router = express.Router();
const { getArticles, getArticleByName, createArticle } = require("../controllers/articleController");

router.get("/", getArticles);
router.post("/", createArticle);
router.get("/:name", getArticleByName);

module.exports = router;
