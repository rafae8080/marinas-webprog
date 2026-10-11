import CornerMarks from "../components/ui/CornerMarks";
import SectionHeader from "../components/ui/SectionHeader";
import TodoText from "../components/ui/TodoText";
import { certifications } from "../data/site";
import Section from "./Section";

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

const Certifications = () => (
  <Section id="certifications">
    <SectionHeader code="SEC-07" title="Certifications" />
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {certifications.map((cert) => (
        <li key={cert.name} className="relative flex flex-col border border-line bg-surface p-5">
          <CornerMarks />
          <p className={label}>{cert.issuer}</p>
          <h3 className="mt-3 font-display text-lg font-medium leading-snug tracking-[-0.02em] text-ink">{cert.name}</h3>
          <p className={`${label} mt-2`}>{cert.date}</p>
          <div className="mt-auto pt-5">
            {cert.url ? (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
              >
                Verify on Credly ↗
              </a>
            ) : (
              <TodoText value="TODO(rafael): Credly URL" />
            )}
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export default Certifications;
