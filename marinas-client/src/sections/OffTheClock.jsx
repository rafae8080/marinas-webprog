import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import CornerMarks from "../components/ui/CornerMarks";
import SectionHeader from "../components/ui/SectionHeader";
import Tag from "../components/ui/Tag";
import TodoText from "../components/ui/TodoText";
import { getProject } from "../data/projects";
import { hobbies } from "../data/site";
import Section from "./Section";

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

// Photo, or a mono PHOTO PENDING frame when there isn't one yet
const Photo = ({ hobby }) =>
  hobby.photo ? (
    <img
      src={hobby.photo}
      alt={`${hobby.title}: Rafael off the clock`}
      loading="lazy"
      className="aspect-[4/3] w-full border border-line object-cover"
    />
  ) : (
    <div
      role="img"
      aria-label={`${hobby.title} photo pending`}
      className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-line bg-bg"
    >
      <span className={label}>Photo pending</span>
    </div>
  );

const Tile = ({ hobby, index, compact }) => {
  const project = hobby.projectSlug ? getProject(hobby.projectSlug) : null;

  return (
    <li className="relative flex flex-col border border-line bg-surface p-3">
      <CornerMarks />
      <Photo hobby={hobby} />
      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <p className={label}>
          <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> · Off the clock
        </p>
        <h3 className="mt-2 font-display text-xl font-medium tracking-[-0.02em] text-ink">{hobby.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{hobby.caption}</p>

        {hobby.games && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Games">
            {hobby.games.map((game) => (
              <li key={game}>
                <Tag>{game}</Tag>
              </li>
            ))}
          </ul>
        )}

        {!compact && hobby.stats.length > 0 && (
          <dl className="mt-4 space-y-1">
            {hobby.stats.map((stat) => (
              <div key={stat.label} className="flex flex-wrap items-baseline gap-2">
                <dt className={label}>{stat.label}:</dt>
                <dd className="font-mono text-xs uppercase tracking-[0.12em] text-ink">
                  <TodoText value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        {project && (
          <Link
            viewTransition
            to={`/work/${project.slug}`}
            className="mt-auto pt-4 font-mono text-xs uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
          >
            Related: {project.title} →
          </Link>
        )}
      </div>
    </li>
  );
};

// Full version on /about, compact version on Home (#off-the-clock)
const OffTheClock = ({ compact = false, code = "SEC-08" }) => (
  <Section id="off-the-clock">
    <SectionHeader code={code} title="Off the Clock" />
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {hobbies.map((hobby, i) => (
        <Tile key={hobby.id} hobby={hobby} index={i} compact={compact} />
      ))}
    </ul>
    {compact && (
      <div className="mt-8">
        <Button to="/about" variant="ghost">
          More about me →
        </Button>
      </div>
    )}
  </Section>
);

export default OffTheClock;
