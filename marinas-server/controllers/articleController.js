const mongoose = require("mongoose");
const Article = require("../models/Article");

// Articles live in MongoDB (Phase 10). Seed with `npm run seed:articles` (scripts/article-seed-data.js).
// Response shapes are unchanged: { articles } and { article }.

const PUBLIC_FIELDS = "name tag title cover alt content publishedAt createdAt updatedAt";

const clean = (value) => (typeof value === "string" ? value.trim() : "");

// Only the fields an admin may set. `img` is accepted as an old name for `cover` (dashboard form).
const pickArticle = (body = {}) => {
  const data = {};
  if (body.name !== undefined) data.name = clean(body.name).toLowerCase();
  if (body.tag !== undefined) data.tag = clean(body.tag);
  if (body.title !== undefined) data.title = clean(body.title);
  if (body.cover !== undefined || body.img !== undefined) data.cover = clean(body.cover ?? body.img);
  if (body.alt !== undefined) data.alt = clean(body.alt);
  if (body.content !== undefined) {
    const paragraphs = Array.isArray(body.content) ? body.content : String(body.content).split(/\n\s*\n/);
    data.content = paragraphs.map(clean).filter(Boolean);
  }
  if (typeof body.published === "boolean") data.published = body.published;
  if (body.publishedAt !== undefined && !Number.isNaN(Date.parse(body.publishedAt))) data.publishedAt = new Date(body.publishedAt);
  return data;
};

// GET /api/articles (public): published only, newest first
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ published: true }, PUBLIC_FIELDS)
      .sort({ publishedAt: -1, createdAt: 1 }) // same date: keep the original (seeding) order
      .lean();
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/articles/:name (public): one published article by slug
const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ name: String(req.params.name).toLowerCase(), published: true }, PUBLIC_FIELDS).lean();
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ article });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/articles (admin)
const createArticle = async (req, res) => {
  const data = pickArticle(req.body);
  if (!data.name || !data.tag || !data.title || !data.content?.length) {
    return res.status(400).json({ message: "name, tag, title, and content are required." });
  }
  try {
    if (await Article.exists({ name: data.name })) {
      return res.status(409).json({ message: "An article with that slug already exists." });
    }
    const article = await Article.create(data);
    res.status(201).json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/articles/:id (admin)
const updateArticle = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Article not found" });
  try {
    const data = pickArticle(req.body);
    if (data.name && (await Article.exists({ name: data.name, _id: { $ne: req.params.id } }))) {
      return res.status(409).json({ message: "An article with that slug already exists." });
    }
    const article = await Article.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ article });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/articles/:id (admin)
const deleteArticle = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ message: "Article not found" });
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, getArticleByName, createArticle, updateArticle, deleteArticle };
