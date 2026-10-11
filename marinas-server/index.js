require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const contactRoutes = require("./routes/contactRoutes");
const faqRoutes = require("./routes/faqRoutes");
const rmoRoutes = require("./routes/rmoRoutes");

const app = express();

//Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS: allow origins from CLIENT_ORIGIN (comma-separated) plus local dev (vite dev and vite preview).
// An entry may contain one `*` for Vercel's per-deployment URLs, e.g.
// https://marinas-client-*-rafae8080s-projects.vercel.app. The `*` matches letters and digits only (no dots or
// dashes), so it can't stretch into another account's URL.
const allowedOrigins = [
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean),
  "http://localhost:5173",
  "http://localhost:4173",
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const originPatterns = allowedOrigins
  .filter((o) => o.includes("*"))
  .map((o) => new RegExp(`^${o.split("*").map(escapeRegExp).join("[a-z0-9]+")}$`));

const isAllowedOrigin = (origin) =>
  allowedOrigins.includes(origin) || originPatterns.some((pattern) => pattern.test(origin));

const corsOptions = {
  origin: (origin, callback) => {
    // Requests with no Origin header (curl, server-to-server) are allowed
    if (!origin || isAllowedOrigin(origin)) return callback(null, true);
    return callback(null, false);
  },
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Health check (no DB needed)
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/rmo", rmoRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
