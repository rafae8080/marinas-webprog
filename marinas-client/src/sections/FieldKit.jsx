import SectionHeader from "../components/ui/SectionHeader";
import Tag from "../components/ui/Tag";
import { skills } from "../data/site";
import Section from "./Section";

// Skills as an equipment loadout: no bars, no percentages (§B1.6)
const FieldKit = () => (
  <Section id="field-kit">
    <SectionHeader code="SEC-04" title="Field Kit" kicker="What I carry into a project, grouped the way I reach for it." />
    <dl className="mt-8 border-t border-line">
      {skills.map((group, i) => (
        <div
          key={group.group}
          className="grid gap-3 border-b border-line py-5 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
        >
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            <span className="text-ink">{String(i + 1).padStart(2, "0")}</span> · {group.group}
          </dt>
          <dd className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default FieldKit;
