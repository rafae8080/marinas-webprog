const express = require("express");
const router = express.Router();
const { getArticles, getArticleByName } = require("../controllers/articleController");

router.get("/", getArticles);
router.get("/:name", getArticleByName);

module.exports = router;
