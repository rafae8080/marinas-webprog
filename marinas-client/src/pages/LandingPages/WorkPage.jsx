import { Link, useSearchParams } from "react-router-dom";
import CaseFileCard from "../../components/ui/CaseFileCard";
import SectionHeader from "../../components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "../../components/ui/Reveal";
import Tag from "../../components/ui/Tag";
import projects, { isTodo, projectTypes } from "../../data/projects";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const filters = ["all", ...projectTypes, "client"];

const statusTone = { DEPLOYED: "ok", COMPLETED: "ok", "IN PROGRESS": "accent", ARCHIVED: "neutral" };

// Case numbers follow the full list order, so they don't change when filtering
const indexed = projects.map((project, i) => ({ ...project, caseNo: String(i + 1).padStart(2, "0") }));

const matches = (project, filter) => {
  if (filter === "all") return true;
  if (filter === "client") return project.client;
  return project.type.includes(filter);
};

const chipClass = (active) =>
  `min-h-9 border px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
    active ? "border-accent bg-accent-wash text-accent" : "border-line text-muted hover:border-ink hover:text-ink"
  }`;

const IndexRow = ({ project }) => (
  <RevealItem as="li">
    <Link
      viewTransition
      to={`/work/${project.slug}`}
      className="group grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line py-4 font-mono text-xs uppercase tracking-[0.12em] sm:flex sm:gap-4"
    >
      <span className="text-muted group-hover:text-accent">{project.caseNo}</span>
      <span className="font-display text-lg font-medium normal-case tracking-[-0.02em] text-ink group-hover:text-accent sm:text-xl">
        {project.title}
      </span>
      {/* Dot leaders */}
      <span aria-hidden="true" className="hidden min-w-8 flex-1 translate-y-[-0.3em] border-b border-dotted border-line sm:block" />
      <span className="col-start-2 text-muted">
        {project.stack.slice(0, 2).join(" · ")} · {project.year}
      </span>
      <span className="col-start-2 sm:col-auto">
        <Tag tone={statusTone[project.status] ?? "neutral"}>{project.status}</Tag>
      </span>
    </Link>
  </RevealItem>
);

export default function WorkPage() {
  useDocumentTitle("Work — Rafael Marinas");
  const [params, setParams] = useSearchParams();
  const requested = params.get("type")?.toLowerCase();
  const filter = filters.includes(requested) ? requested : "all";
  const view = params.get("view") === "grid" ? "grid" : "index";

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const shown = indexed.filter((p) => matches(p, filter));

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        as="h1"
        code="SEC-03"
        title="Index"
        kicker="Every project I can show, from the E-Telly capstone to class work. Featured ones have full case files."
      />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => update("type", f, "all")}
              className={chipClass(filter === f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Layout" className="flex gap-2">
          {["index", "grid"].map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => update("view", v, "index")}
              className={chipClass(view === v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter !== "all" && ` · ${filter}`}
      </p>

      {view === "index" ? (
        <RevealGroup as="ul" key={`index-${filter}`} className="mt-2 border-t border-line">
          {shown.map((project) => (
            <IndexRow key={project.slug} project={project} />
          ))}
        </RevealGroup>
      ) : (
        <RevealGroup key={`grid-${filter}`} className="mt-4 grid gap-8 md:grid-cols-2">
          {shown.map((project) => (
            <RevealItem key={project.slug}>
              <CaseFileCard
                index={Number(project.caseNo)}
                title={project.title}
                status={project.status}
                year={project.year}
                stack={project.stack.slice(0, 4)}
                metric={project.cardMetric}
                summary={isTodo(project.summary) ? undefined : project.summary}
                to={`/work/${project.slug}`}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </section>
  );
}
