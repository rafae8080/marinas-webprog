const toneClasses = {
  neutral: "border-line text-muted",
  accent: "border-accent text-accent",
  ok: "border-ok text-ok",
};

// Mono uppercase chip for stacks, categories and stamps
const Tag = ({ children, tone = "neutral", className = "" }) => (
  <span
    className={`inline-flex items-center border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${
      toneClasses[tone] ?? toneClasses.neutral
    } ${className}`}
  >
    {children}
  </span>
);

export default Tag;
