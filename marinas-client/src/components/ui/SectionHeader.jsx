// SEC-02 // CASE FILES label + display title, with optional coordinates on the right
const SectionHeader = ({ code, title, kicker, coords, as = "h2", className = "" }) => {
  const Heading = as;

  return (
    <header className={className}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span>
          {code && <span className="text-accent">{code}</span>}
          {code && " // "}
          {title}
        </span>
        {coords && <span className="hidden sm:inline">{coords}</span>}
      </div>
      <Heading className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
        {title}
      </Heading>
      {kicker && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{kicker}</p>}
    </header>
  );
};

export default SectionHeader;
