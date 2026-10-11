const toneClasses = {
  ok: "bg-ok",
  accent: "bg-accent",
  muted: "bg-muted",
};

// ● AVAILABLE-style indicator with a radar ping (still when reduced motion is on)
const StatusDot = ({ label, tone = "ok", ping = true, className = "" }) => {
  const color = toneClasses[tone] ?? toneClasses.ok;

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink ${className}`}
    >
      <span className="relative inline-flex size-2" aria-hidden="true">
        {ping && (
          <span
            className={`absolute inset-0 rounded-full ${color} animate-radar-ping motion-reduce:hidden`}
          />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${color}`} />
      </span>
      {label}
    </span>
  );
};

export default StatusDot;
