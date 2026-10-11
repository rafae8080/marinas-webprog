// Helpers for Field Notes (articles from /api/articles)

// Reading time: words / 200, rounded up (at least 1)
export const readingTime = (content = []) => {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Manila" });

// "05 Apr 2026"; empty when there's no date
export const noteDate = (article) => {
  const value = article?.publishedAt || article?.createdAt;
  return value ? dateFormat.format(new Date(value)) : "";
};

export const excerpt = (content = [], length = 160) => {
  const first = content[0] || "";
  return first.length > length ? `${first.slice(0, length).replace(/\s+\S*$/, "")}…` : first;
};
