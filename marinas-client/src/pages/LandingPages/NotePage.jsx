import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoteCover from "../../components/NoteCover";
import { contact } from "../../data/site";
import { noteDate, readingTime } from "../../data/notes";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchArticles } from "../../services/ArticleService";
import NotFoundPage from "../NotFoundPage";

const mono = "font-mono text-[11px] uppercase tracking-[0.12em]";

export default function NotePage() {
  const { name } = useParams();
  // { status: "loading" | "ok" | "missing" | "error", list, index } for the current slug
  const [result, setResult] = useState({ name: null, status: "loading", list: [], index: -1 });

  useEffect(() => {
    let cancelled = false;
    fetchArticles()
      .then(({ data }) => {
        if (cancelled) return;
        const list = data.articles || [];
        const index = list.findIndex((a) => a.name === name);
        setResult({ name, status: index === -1 ? "missing" : "ok", list, index });
      })
      .catch(() => !cancelled && setResult({ name, status: "error", list: [], index: -1 }));
    return () => {
      cancelled = true;
    };
  }, [name]);

  // A new slug shows "loading" until its data arrives
  const status = result.name === name ? result.status : "loading";
  const note = status === "ok" ? result.list[result.index] : null;
  useDocumentTitle(note ? `${note.title} — Field Notes` : "Field Notes — Rafael Marinas");

  if (status === "missing") return <NotFoundPage />;

  // min-h-screen: the footer stays put while the note loads
  if (status === "loading" || status === "error") {
    return (
      <section className="mx-auto min-h-screen max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link viewTransition to="/notes" className={`${mono} text-muted hover:text-ink`}>
          ← Field Notes
        </Link>
        {status === "loading" ? (
          <p className={`${mono} mt-10 text-muted`} aria-live="polite">
            Loading note…
          </p>
        ) : (
          <p className="mt-10 text-base text-muted" role="alert">
            This note can't be loaded right now. Try again later, or email{" "}
            <a href={`mailto:${contact.email}`} className="text-accent underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
      </section>
    );
  }

  const { list, index } = result;
  const newer = index > 0 ? list[index - 1] : null;
  const older = index < list.length - 1 ? list[index + 1] : null;
  const date = noteDate(note);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link viewTransition to="/notes" className={`${mono} text-muted hover:text-ink`}>
        ← Field Notes
      </Link>

      <header className="mt-8 max-w-[68ch]">
        <p className={`${mono} text-muted`}>
          <span className="text-accent">Note {String(index + 1).padStart(2, "0")}</span>
          {date && (
            <>
              {" · "}
              <time dateTime={note.publishedAt || note.createdAt}>{date}</time>
            </>
          )}{" "}
          · {note.tag} · {readingTime(note.content)} min read
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
          {note.title}
        </h1>
      </header>

      {note.cover ? (
        <img src={note.cover} alt={note.alt || ""} className="mt-10 aspect-[16/9] w-full border border-line object-cover" />
      ) : (
        <NoteCover slug={note.name} title={note.title} tag={note.tag} index={index + 1} className="mt-10 aspect-[16/9] w-full" />
      )}

      <div className="mt-10 max-w-[68ch] space-y-6 text-lg leading-relaxed text-ink">
        {note.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <nav aria-label="More field notes" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {newer ? (
          <Link viewTransition to={`/notes/${newer.name}`} className="group border border-line p-4 hover:border-ink">
            <span className={`${mono} text-muted`}>← Newer</span>
            <span className="mt-1 block font-display text-lg font-medium text-ink group-hover:text-accent">{newer.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link viewTransition to={`/notes/${older.name}`} className="group border border-line p-4 text-right hover:border-ink">
            <span className={`${mono} text-muted`}>Older →</span>
            <span className="mt-1 block font-display text-lg font-medium text-ink group-hover:text-accent">{older.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
