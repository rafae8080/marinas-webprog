import { Link } from "react-router-dom";
import CornerMarks from "./CornerMarks";
import Tag from "./Tag";

const statusTone = {
  DEPLOYED: "ok",
  "IN PROGRESS": "accent",
  ARCHIVED: "neutral",
};

// Project "case file": corner tab, status stamp, thin accent rule, one real metric
const CaseFileCard = ({ index, title, status, year, stack = [], metric, summary, to }) => {
  const caseNo = String(index).padStart(2, "0");

  const body = (
    <>
      <CornerMarks />
      <span className="absolute -top-px left-4 -translate-y-full border border-b-0 border-line bg-surface px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors group-hover:border-accent group-hover:text-accent">
        CASE {caseNo}
      </span>

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-ink">{title}</h3>
        {status && <Tag tone={statusTone[status] ?? "neutral"}>{status}</Tag>}
      </div>

      <div className="mt-3 h-px w-12 bg-accent" aria-hidden="true" />

      {summary && <p className="mt-4 text-base leading-relaxed text-muted">{summary}</p>}

      {metric && <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-ink">{metric}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {year && (
          <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{year}</span>
        )}
        {stack.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </>
  );

  const classes =
    "group relative mt-6 block border border-line bg-surface p-6 transition-[transform,border-color] hover:border-ink motion-safe:hover:-translate-y-0.5";

  return to ? (
    <Link viewTransition to={to} className={classes}>
      {body}
    </Link>
  ) : (
    <article className={classes}>{body}</article>
  );
};

export default CaseFileCard;
