import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCover from "../../components/NoteCover";
import SectionHeader from "../../components/ui/SectionHeader";
import { contact } from "../../data/site";
import { excerpt, noteDate, readingTime } from "../../data/notes";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchArticles } from "../../services/ArticleService";

const mono = "font-mono text-[11px] uppercase tracking-[0.12em]";

export default function NotesPage() {
  useDocumentTitle("Field Notes — Rafael Marinas");
  const [notes, setNotes] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchArticles()
      .then(({ data }) => !cancelled && setNotes(data.articles || []))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        as="h1"
        code="SEC-N1"
        title="Field Notes"
        kicker="Notes from building things: code, tools, databases, and what each project taught me."
      />

      {/* Reserved height: the list arrives from the API, and the footer shouldn't jump when it does */}
      <div className="min-h-screen">
        {failed && (
          <p className="mt-10 text-base text-muted" role="alert">
            Field Notes can't be loaded right now. Try again later, or email{" "}
            <a href={`mailto:${contact.email}`} className="text-accent underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}

        {!failed && notes === null && (
          <p className={`${mono} mt-10 text-muted`} aria-live="polite">
            Loading notes…
          </p>
        )}

        {notes && (
          <>
            <p className={`${mono} mt-8 text-muted`}>
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
            <ol className="mt-2 border-t border-line">
              {notes.map((note, i) => (
                <li key={note.name}>
                  <Link
                    viewTransition
                    to={`/notes/${note.name}`}
                    className="group grid gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <NoteCover slug={note.name} size="small" className="hidden aspect-[16/9] sm:block" />
                    <div>
                      <p className={`${mono} text-muted`}>
                        <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                        {noteDate(note) && ` · ${noteDate(note)}`} · {note.tag} · {readingTime(note.content)} min read
                      </p>
                      <h2 className="mt-2 font-display text-xl font-medium tracking-[-0.02em] text-ink group-hover:text-accent sm:text-2xl">
                        {note.title}
                      </h2>
                      <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-muted">{excerpt(note.content)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
