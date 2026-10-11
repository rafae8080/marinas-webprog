const jwt = require("jsonwebtoken");

// Verifies "Authorization: Bearer <token>" and sets req.user to the token claims
// ({ id, email, type }, as signed in loginUser).
const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Must run after requireAuth.
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };
