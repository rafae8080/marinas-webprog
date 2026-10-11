import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Lightbox from "../../components/Lightbox";
import Button from "../../components/ui/Button";
import CornerMarks from "../../components/ui/CornerMarks";
import Counter from "../../components/ui/Counter";
import Tag from "../../components/ui/Tag";
import TodoText from "../../components/ui/TodoText";
import projects from "../../data/projects";
import NotFoundPage from "../NotFoundPage";

const statusTone = { DEPLOYED: "ok", "IN PROGRESS": "accent", ARCHIVED: "neutral" };
const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

// TODO(rafael) values stay visible as placeholders (Part A3)
const Text = TodoText;

const Section = ({ code, title, children }) => (
  <section className="border-t border-line py-10 md:grid md:grid-cols-[12rem_1fr] md:gap-8">
    <h2 className={`${label} mb-4 md:mb-0`}>
      <span className="text-accent">{code}</span> // {title}
    </h2>
    <div>{children}</div>
  </section>
);

const Fact = ({ name, children }) => (
  <div>
    <dt className={label}>{name}</dt>
    <dd className="mt-1 text-sm leading-relaxed text-ink">{children}</dd>
  </div>
);

export default function CaseStudyPage() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const position = projects.findIndex((p) => p.slug === slug);
  if (position === -1) return <NotFoundPage />;

  const project = projects[position];
  const caseNo = String(position + 1).padStart(2, "0");
  const prev = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const showClientDetails = project.client && !project.confidential;

  const links = [
    !project.confidential && project.repo && { label: "Repo", href: project.repo },
    project.demo && { label: "Live", href: project.demo },
    project.apk && { label: "APK", href: project.apk },
  ].filter(Boolean);

  let n = 0;
  const code = () => `${String(++n).padStart(2, "0")}`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/work" className={`${label} hover:text-ink`}>
        ← Index
      </Link>

      {/* CASE FILE header */}
      <header className="relative mt-8 border border-line bg-surface p-6 sm:p-8">
        <CornerMarks />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={label}>
            Case file <span className="text-ink">{caseNo}</span> · {project.type.join(" + ")}
          </p>
          <Tag tone={statusTone[project.status] ?? "neutral"}>{project.status}</Tag>
        </div>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
          {project.title}
        </h1>
        <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
          <Text value={project.summary} />
        </p>
        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <Fact name="Year">{project.year}</Fact>
          <Fact name="Role">
            <Text value={project.role} />
          </Fact>
          <Fact name="Team">
            <Text value={project.team} />
          </Fact>
          <Fact name="Type">{project.client ? `${project.type.join(" + ")} · client` : project.type.join(" + ")}</Fact>
          {showClientDetails && project.clientName && (
            <Fact name="Client">
              <Text value={project.clientName} />
            </Fact>
          )}
        </dl>
        {project.confidential && <p className={`${label} mt-6 text-accent`}>Client details redacted</p>}
      </header>

      <Section code={code()} title="Problem">
        <p className="max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          <Text value={project.problem} />
        </p>
      </Section>

      <Section code={code()} title="What I built">
        {project.teamNote && <p className="mb-6 max-w-3xl text-base leading-relaxed text-ink">{project.teamNote}</p>}
        <ul className="max-w-3xl space-y-3">
          {project.built.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {project.architecture && (
        <Section code={code()} title="Architecture">
          <img
            src={project.architecture}
            alt={`${project.title} architecture diagram`}
            className="w-full border border-line bg-surface"
          />
        </Section>
      )}

      {project.screenshots.length > 0 && (
        <Section code={code()} title="Screenshots">
          {/* Desktop shots in a 2-column grid, phone shots in a narrower grid; the lightbox keeps one order */}
          {[
            { portrait: false, grid: "grid gap-4 sm:grid-cols-2", img: "aspect-[16/9] object-cover object-top" },
            { portrait: true, grid: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", img: "h-auto" },
          ].map((group) => {
            const shots = project.screenshots
              .map((shot, i) => ({ shot, i }))
              .filter(({ shot }) => Boolean(shot.portrait) === group.portrait);
            if (shots.length === 0) return null;
            return (
              <ul key={String(group.portrait)} className={`${group.grid} [&+ul]:mt-8`}>
                {shots.map(({ shot, i }) => (
                  <li key={shot.src}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group block w-full text-left"
                      aria-label={`Open screenshot: ${shot.caption || shot.alt}`}
                    >
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className={`w-full border border-line bg-surface transition-colors group-hover:border-ink ${group.img}`}
                      />
                      {shot.caption && (
                        <span className={`${label} mt-2 block group-hover:text-ink`}>
                          {String(i + 1).padStart(2, "0")} · {shot.caption}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            );
          })}
        </Section>
      )}

      {project.metrics.length > 0 && (
        <Section code={code()} title="Results">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col-reverse border-l border-accent pl-4">
                <dt className={`${label} mt-2`}>{metric.label}</dt>
                <dd className="font-display text-4xl font-medium tracking-[-0.02em] text-ink">
                  <Counter value={metric.value} decimals={metric.decimals} suffix={metric.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section code={code()} title="Stack">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </Section>

      <Section code={code()} title="What I'd do next">
        <p className="max-w-3xl text-base leading-relaxed text-ink">
          <Text value={project.nextSteps} />
        </p>
      </Section>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 border-t border-line py-8">
          {links.map((link, i) => (
            <Button key={link.label} href={link.href} variant={i === 0 ? "primary" : "secondary"}>
              {link.label} ↗
            </Button>
          ))}
        </div>
      )}

      <nav aria-label="More case files" className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <Link to={`/work/${prev.slug}`} className="group border border-line p-4 hover:border-ink">
          <span className={label}>← Previous</span>
          <span className="mt-1 block font-display text-lg font-medium text-ink group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
        <Link to={`/work/${next.slug}`} className="group border border-line p-4 text-right hover:border-ink">
          <span className={label}>Next →</span>
          <span className="mt-1 block font-display text-lg font-medium text-ink group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      </nav>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.screenshots}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </article>
  );
}
