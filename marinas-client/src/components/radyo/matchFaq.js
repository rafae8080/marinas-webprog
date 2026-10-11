import Fuse from "fuse.js";

// Words that carry no meaning for matching ("what is your stack" -> "stack")
const STOPWORDS = new Set(
  "a an and are about any at be can could did do does for from get have he hes him his how i im in is it its me my of on or rafael rafaels so tell that the there this to u us was we what whats when which who why will with would you your youre".split(
    " ",
  ),
);

const FUSE_OPTIONS = {
  keys: [
    { name: "question", weight: 0.6 },
    { name: "keywords", weight: 0.4 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
  includeScore: true,
};

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/e-telly|e telly/g, "etelly")
    .replace(/[^a-z0-9.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Builds a matcher over the FAQ list. Returns (query) => faq | null.
// 1) Fuse on the whole query, 2) Fuse per meaningful word, summed. Highest total wins.
export const createMatcher = (faqs) => {
  const fuse = new Fuse(faqs, FUSE_OPTIONS);

  return (rawQuery) => {
    const query = normalize(rawQuery || "");
    if (!query) return null;

    const totals = new Map();
    const add = (results, weight) => {
      for (const { item, score } of results) {
        totals.set(item, (totals.get(item) || 0) + (1 - score) * weight);
      }
    };

    add(fuse.search(query), 1);
    const words = query.split(" ").filter((w) => w.length >= 3 && !STOPWORDS.has(w));
    for (const word of words) add(fuse.search(word), 1);

    let best = null;
    let bestScore = 0;
    for (const [item, total] of totals) {
      // Ties go to the earlier FAQ (lower `order`)
      if (total > bestScore || (total === bestScore && best && item.order < best.order)) {
        best = item;
        bestScore = total;
      }
    }
    // Require a reasonably confident match so gibberish falls through to the fallback
    return bestScore >= 0.6 ? best : null;
  };
};
