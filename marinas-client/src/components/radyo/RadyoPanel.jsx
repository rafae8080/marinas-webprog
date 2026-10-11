import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import RadyoAvatar from "./RadyoAvatar";
import { createMatcher } from "./matchFaq";

const NAME = "RMO";
const GREETING = `${NAME} here. Ask me about Rafael's work.`;
const FALLBACK =
  "Copy that — I don't have that on file yet. I've logged your question for Rafael. Want to send him a message?";
// When running from the offline copy the question can't be logged, so don't claim it was
const FALLBACK_OFFLINE =
  "Copy that — I don't have that on file yet, and I'm offline so I couldn't log it. Want to send Rafael a message?";
const CHIPS = ["Tech stack", "E-Telly", "Is he available?", "Education", "Contact"];
const THINKING_MS = 400; // minimum "thinking" time, for feel
const HISTORY_TURNS = 4; // previous messages sent to the AI for follow-up questions

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const mono = "font-mono text-[11px] uppercase tracking-[0.12em]";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextId = 1;
const msg = (from, text, extra = {}) => ({ id: nextId++, from, text, ...extra });

// FAQs from the API, or the bundled copy (src/data/faqs.json) if the API can't be reached
const loadFaqs = async () => {
  try {
    const { data } = await api.get("/faqs", { timeout: 6000 });
    if (Array.isArray(data?.faqs) && data.faqs.length > 0) return { faqs: data.faqs, source: "live" };
  } catch {
    // fall through to the offline copy
  }
  const offline = await import("../../data/faqs.json");
  return { faqs: offline.default, source: "offline" };
};

// Internal links navigate in-app (and close the panel); external ones open a new tab
const LinkButton = ({ link, onGo }) =>
  link.url.startsWith("/") ? (
    <button type="button" onClick={() => onGo(link.url)} className={`${mono} border border-line px-2 py-1 text-accent hover:border-accent`}>
      {link.label} →
    </button>
  ) : (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${mono} inline-block border border-line px-2 py-1 text-accent hover:border-accent`}
    >
      {link.label} ↗
    </a>
  );

// Question flow:
// - Suggestion chips answer straight from the FAQ list (instant, and they don't use the free AI quota).
// - Typed questions go to the AI on the server (/api/rmo/ask), which may only use Rafael's verified facts.
// - If the AI is off, over quota or unreachable (503 / network), RMO answers from the FAQ list instead.
const RadyoPanel = ({ onClose, side = "right" }) => {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const timers = useRef([]);

  const [faqs, setFaqs] = useState(null);
  const [source, setSource] = useState(null);
  const [messages, setMessages] = useState(() => [msg("bot", GREETING, { greeting: true })]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState("listening"); // listening | thinking | happy
  const busy = mood === "thinking";

  const match = useMemo(() => (faqs ? createMatcher(faqs) : null), [faqs]);

  // Load FAQs once when the panel opens
  useEffect(() => {
    let cancelled = false;
    loadFaqs().then((result) => {
      if (cancelled) return;
      setFaqs(result.faqs);
      setSource(result.source);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Focus the input, trap Tab, close on Esc, and lock page scroll on small screens
  useEffect(() => {
    const panel = panelRef.current;
    inputRef.current?.focus();
    const pending = timers.current;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [...panel.querySelectorAll(focusableSelector)];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      pending.forEach(clearTimeout);
    };
  }, [onClose]);

  // Keep the newest message in view
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, mood]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const ask = async (raw, { fromChip = false } = {}) => {
    const text = raw.trim();
    if (!text || busy || !match) return;
    // Recent turns, for follow-ups like "and his grades?"
    const history = messages
      .filter((m) => !m.greeting && !m.fallback)
      .slice(-HISTORY_TURNS)
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));
    setMessages((m) => [...m, msg("user", text)]);
    setInput("");
    setMood("thinking");
    const minThinking = delay(THINKING_MS); // answer no sooner than this, for feel

    const faq = match(text);
    let reply = null;

    if (fromChip && faq) {
      reply = { text: faq.answer, links: faq.links || [] };
    } else if (source !== "offline") {
      try {
        const { data } = await api.post("/rmo/ask", { question: text, history }, { timeout: 12000 });
        if (data?.answer) reply = { text: data.answer, links: faq?.links || [] };
        else if (data?.unanswered) reply = { fallback: true, logged: true };
      } catch {
        // AI off, over its limit, or unreachable: answer from the FAQ list below
      }
    }

    if (!reply) {
      if (faq) {
        reply = { text: faq.answer, links: faq.links || [] };
      } else {
        reply = { fallback: true, logged: false };
        // Log it for Rafael. Best effort: the bot works the same if this fails.
        if (source !== "offline") {
          api.post("/faqs/unanswered", { text: text.slice(0, 300) }).catch(() => {});
          reply.logged = true;
        }
      }
    }

    await minThinking;
    if (reply.fallback) {
      setMessages((m) => [...m, msg("bot", reply.logged ? FALLBACK : FALLBACK_OFFLINE, { fallback: true })]);
      setMood("listening");
    } else {
      setMessages((m) => [...m, msg("bot", reply.text, { links: reply.links })]);
      setMood("happy");
      later(() => setMood("listening"), 1500);
    }
  };

  const go = (url) => {
    onClose();
    navigate(url, { viewTransition: true });
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="radyo-title"
      className={`fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col border-t border-line bg-surface sm:inset-x-auto sm:bottom-4 sm:h-[34rem] sm:max-h-[calc(100dvh-2rem)] sm:w-[380px] sm:border ${
        side === "left" ? "sm:left-4" : "sm:right-4"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <RadyoAvatar state={mood} size={40} />
        <div className="min-w-0 flex-1">
          <h2 id="radyo-title" className="font-display text-lg font-medium leading-tight tracking-[-0.02em] text-ink">
            {NAME}
          </h2>
          <p className={`${mono} text-muted`}>
            Field radio · {source === "offline" ? "offline" : source === "live" ? "online" : "tuning in…"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`${mono} min-h-11 border border-line px-3 text-ink hover:border-ink`}
        >
          Close
        </button>
      </div>

      {/* Messages */}
      <ol
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label={`Conversation with ${NAME}`}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
      >
        {messages.map((m) =>
          m.from === "user" ? (
            <li key={m.id} className="flex justify-end">
              <p className="max-w-[85%] bg-ink px-3 py-2 text-sm leading-relaxed text-surface">
                <span className="sr-only">You: </span>
                {m.text}
              </p>
            </li>
          ) : (
            <li key={m.id} className="flex gap-2">
              <RadyoAvatar size={32} still className="mt-0.5 shrink-0" />
              <div className="max-w-[85%]">
                <p className="border border-line bg-bg px-3 py-2 text-sm leading-relaxed text-ink">
                  <span className="sr-only">{NAME}: </span>
                  {m.text}
                </p>
                {m.links?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.links.map((link) => (
                      <LinkButton key={link.url} link={link} onGo={go} />
                    ))}
                  </div>
                )}
                {m.fallback && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => go("/#contact")}
                      className={`${mono} bg-accent px-3 py-1.5 text-on-accent hover:bg-accent-deep`}
                    >
                      Send a message ▸
                    </button>
                  </div>
                )}
                {m.greeting && (
                  <div className="mt-3 flex flex-wrap gap-2" aria-label="Suggested questions">
                    {CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => ask(chip, { fromChip: true })}
                        disabled={!match || busy}
                        className={`${mono} border border-line bg-surface px-2 py-1 text-ink hover:border-ink disabled:opacity-50`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ),
        )}
        {busy && (
          <li className="flex items-center gap-2">
            <RadyoAvatar state="thinking" size={32} className="shrink-0" />
            <span className={`${mono} text-muted`}>Receiving…</span>
          </li>
        )}
      </ol>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2 border-t border-line p-3"
      >
        <label htmlFor="radyo-input" className="sr-only">
          Ask {NAME} a question
        </label>
        <input
          ref={inputRef}
          id="radyo-input"
          type="text"
          autoComplete="off"
          maxLength={300}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={match ? "Ask about his stack, E-Telly…" : "Tuning in…"}
          className="min-h-11 min-w-0 flex-1 border border-line bg-bg px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
        />
        <button
          type="submit"
          disabled={!match || busy || !input.trim()}
          className={`${mono} min-h-11 bg-ink px-4 text-surface disabled:opacity-50`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RadyoPanel;
