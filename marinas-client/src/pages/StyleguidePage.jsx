// TEMP: remove in Phase 13
// Shows every Field Map primitive in both themes. Content comes from PORTFOLIO_PLAN.md §B2.
import ThemeToggle from "../components/ThemeToggle";
import Button from "../components/ui/Button";
import CaseFileCard from "../components/ui/CaseFileCard";
import CornerMarks from "../components/ui/CornerMarks";
import Counter from "../components/ui/Counter";
import HazardRule from "../components/ui/HazardRule";
import SectionHeader from "../components/ui/SectionHeader";
import StatusDot from "../components/ui/StatusDot";
import Tag from "../components/ui/Tag";

const tokens = [
  ["bg", "bg-bg"],
  ["surface", "bg-surface"],
  ["ink", "bg-ink"],
  ["muted", "bg-muted"],
  ["line", "bg-line"],
  ["accent", "bg-accent"],
  ["accent-deep", "bg-accent-deep"],
  ["accent-wash", "bg-accent-wash"],
  ["on-accent", "bg-on-accent"],
  ["ok", "bg-ok"],
];

const topoMask = {
  maskImage: "url(/topo.svg)",
  WebkitMaskImage: "url(/topo.svg)",
  maskSize: "cover",
  WebkitMaskSize: "cover",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

const Block = ({ label, children }) => (
  <section className="border-t border-line py-10">
    <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{label}</p>
    {children}
  </section>
);

const StyleguidePage = () => (
  <div className="relative min-h-screen overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-line opacity-35" style={topoMask} />

    <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          Styleguide · temporary · Phase 2
        </p>
        <ThemeToggle />
      </div>

      <h1 className="mt-10 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em]">
        Field Map
        <br />
        design system
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        Body text in Inter. Rafael Marinas, full-stack developer (MERN, Next.js, PHP) and Flutter mobile, Marikina City.
      </p>

      <Block label="Color tokens">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {tokens.map(([name, cls]) => (
            <div key={name} className="border border-line bg-surface p-2">
              <div className={`h-12 border border-line ${cls}`} />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">--{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block label="Typography">
        <p className="font-display text-4xl font-medium tracking-[-0.02em]">Space Grotesk 500 display</p>
        <p className="mt-2 font-display text-4xl font-bold tracking-[-0.02em]">Space Grotesk 700 display</p>
        <p className="mt-4 text-base leading-relaxed">Inter 400 body, 16px, relaxed leading.</p>
        <p className="mt-1 text-lg font-medium leading-relaxed">Inter 500 body, 18px.</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
          JetBrains Mono 400 · 14.65°N 121.10°E · Marikina
        </p>
        <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.12em]">JetBrains Mono 500 label</p>
      </Block>

      <Block label="SectionHeader">
        <SectionHeader
          code="SEC-02"
          title="Case Files"
          kicker="Projects written up as case files: what was built, by whom, and what it measured."
          coords="14.65°N 121.10°E"
        />
      </Block>

      <Block label="Button">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" to="/styleguide">
            Primary
          </Button>
          <Button variant="secondary" to="/styleguide">
            Secondary
          </Button>
          <Button variant="ghost" href="https://github.com/rafae8080">
            Ghost · GitHub
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </Block>

      <Block label="Tag + StatusDot">
        <div className="flex flex-wrap items-center gap-3">
          <Tag>React</Tag>
          <Tag>Flutter</Tag>
          <Tag tone="accent">In progress</Tag>
          <Tag tone="ok">Deployed</Tag>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <StatusDot label="Available for work" />
          <StatusDot label="Live report" tone="accent" />
          <StatusDot label="Offline" tone="muted" ping={false} />
        </div>
      </Block>

      <Block label="Counter">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: 122, label: "Residents evaluated E-Telly" },
            { value: 4.05, decimals: 2, suffix: "/5", label: "Usability mean" },
            { value: 17, label: "Rental units managed" },
            { value: 8, suffix: "×", label: "Dean's Lister" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{stat.label}</dt>
              <dd className="mt-2 font-display text-4xl font-medium tracking-[-0.02em]">
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block label="CaseFileCard">
        <div className="grid gap-8 md:grid-cols-2">
          <CaseFileCard
            index={1}
            title="E-Telly"
            status="IN PROGRESS"
            year="2025–present"
            stack={["MERN", "Flutter", "Firebase Auth"]}
            metric="122 residents · usability 4.05/5"
            summary="Decentralized disaster preparedness and communication system. Capstone, team of 5."
            to="/styleguide"
          />
          <CaseFileCard
            index={2}
            title="StayNest"
            status="IN PROGRESS"
            year="2026"
            stack={["VB.NET", "MySQL"]}
            summary="Airbnb-style booking system with system documentation."
          />
        </div>
      </Block>

      <Block label="CornerMarks">
        <div className="relative max-w-sm border border-line bg-surface p-6">
          <CornerMarks />
          <p className="text-muted">Registration marks sit on each corner.</p>
        </div>
      </Block>

      <Block label="HazardRule (max 3 per site)">
        <HazardRule />
      </Block>
    </main>
  </div>
);

export default StyleguidePage;
