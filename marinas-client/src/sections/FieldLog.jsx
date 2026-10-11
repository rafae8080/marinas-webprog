import SectionHeader from "../components/ui/SectionHeader";
import TodoText from "../components/ui/TodoText";
import { timeline } from "../data/site";
import Section from "./Section";

// Vertical timeline, oldest first, like entries in a field log
const FieldLog = ({ code = "SEC-06" }) => (
  <Section id="field-log">
    <SectionHeader code={code} title="Field Log" kicker="From running rental units to building the systems behind them." />
    <ol className="relative mt-10 ml-1 border-l border-line">
      {timeline.map((entry, i) => {
        const last = i === timeline.length - 1;
        return (
          <li key={entry.title} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-1.5 size-2.5 border ${
                last ? "border-accent bg-bg" : "border-line bg-surface"
              }`}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
              <TodoText value={entry.period} />
            </p>
            <h3 className="mt-2 font-display text-xl font-medium tracking-[-0.02em] text-ink">{entry.title}</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{entry.detail}</p>
          </li>
        );
      })}
    </ol>
  </Section>
);

export default FieldLog;
