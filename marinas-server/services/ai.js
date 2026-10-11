// Minimal client for any OpenAI-compatible chat API (free tiers: Groq, Google Gemini, ...).
// Configured only through env vars, so switching provider never needs a code change:
//   AI_API_URL   base URL, e.g. https://api.groq.com/openai/v1
//   AI_API_KEY   secret key (server only, never sent to the browser)
//   AI_MODEL     model name from the provider's model list
//   AI_ENABLED   set to "false" to switch the AI off (RMO falls back to the FAQ list)
//   AI_DAILY_LIMIT  max AI calls per day per server instance (default 300; best effort on serverless)
//   AI_REASONING_EFFORT  optional, e.g. "low" for reasoning models such as Groq's openai/gpt-oss-*.
//                        Only sent when set, so providers/models that don't support it are unaffected.

const TIMEOUT_MS = 9000;

const config = () => ({
  url: (process.env.AI_API_URL || "").replace(/\/+$/, ""),
  key: process.env.AI_API_KEY || "",
  model: process.env.AI_MODEL || "",
  enabled: process.env.AI_ENABLED !== "false",
  dailyLimit: Number(process.env.AI_DAILY_LIMIT) || 300,
  reasoningEffort: process.env.AI_REASONING_EFFORT || "",
});

const isConfigured = () => {
  const c = config();
  return Boolean(c.enabled && c.url && c.key && c.model);
};

// In-memory daily counter (resets on restart / per serverless instance)
const usage = { day: "", count: 0 };
const takeQuota = () => {
  const { dailyLimit } = config();
  const today = new Date().toISOString().slice(0, 10);
  if (usage.day !== today) {
    usage.day = today;
    usage.count = 0;
  }
  if (usage.count >= dailyLimit) return false;
  usage.count += 1;
  return true;
};

class AiUnavailable extends Error {}

// messages: [{ role: "system" | "user" | "assistant", content }]. Returns the reply text.
// maxTokens leaves room for "thinking" models; answer length is limited by the prompt and by tidy() in the controller.
const chat = async (messages, { maxTokens = 800 } = {}) => {
  if (!isConfigured()) throw new AiUnavailable("AI is not configured");
  if (!takeQuota()) throw new AiUnavailable("Daily AI limit reached");

  const { url, key, model, reasoningEffort } = config();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${url}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: maxTokens,
        ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      // 401 bad key, 429 quota, 5xx provider trouble: all mean "use the FAQ fallback"
      throw new AiUnavailable(`AI provider returned ${res.status}`);
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== "string" || !text.trim()) throw new AiUnavailable("Empty AI reply");
    return text.trim();
  } catch (error) {
    if (error instanceof AiUnavailable) throw error;
    throw new AiUnavailable(error.name === "AbortError" ? "AI request timed out" : error.message);
  } finally {
    clearTimeout(timer);
  }
};

module.exports = { chat, isConfigured, AiUnavailable };
