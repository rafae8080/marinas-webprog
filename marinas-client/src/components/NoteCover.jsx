// Generated cover for a Field Note: contour rings seeded by the slug (same slug = same cover) + mono labels.
// Replaces the old Unsplash images. Colors come from the theme tokens.

// Small string hash -> seed, then a seeded PRNG (mulberry32)
const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
};
const prng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const WIDTH = 640;
const HEIGHT = 360;

// One "hill": concentric wobbly rings around a center. Wobble = a few sine waves with seeded phases.
const hill = (rand) => {
  const cx = 80 + rand() * (WIDTH - 160);
  const cy = 60 + rand() * (HEIGHT - 120);
  const base = 40 + rand() * 50;
  const rings = 4 + Math.floor(rand() * 4);
  const waves = [1, 2, 3].map((k) => ({ k: k + 1, amp: 0.06 + rand() * 0.12, phase: rand() * Math.PI * 2 }));
  const stretch = 0.6 + rand() * 0.6;
  return Array.from({ length: rings }, (_, r) => {
    const radius = base + r * (16 + rand() * 6);
    let d = "";
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const wobble = 1 + waves.reduce((sum, w) => sum + w.amp * Math.sin(w.k * a + w.phase + r * 0.15), 0);
      const x = cx + Math.cos(a) * radius * wobble;
      const y = cy + Math.sin(a) * radius * wobble * stretch;
      d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return `${d}Z`;
  });
};

const makeCover = (slug) => {
  const rand = prng(hash(slug || "field-note"));
  const hills = 1 + Math.floor(rand() * 2);
  const paths = Array.from({ length: hills }, () => hill(rand)).flat();
  const marker = { x: 60 + rand() * (WIDTH - 120), y: 50 + rand() * (HEIGHT - 100) };
  return { paths, marker, accentRing: Math.floor(rand() * paths.length) };
};

const NoteCover = ({ slug, title, tag, index, size = "large", className = "" }) => {
  const { paths, marker, accentRing } = makeCover(slug);
  const small = size === "small";

  return (
    <div className={`relative overflow-hidden border border-line bg-surface ${className}`}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block h-full w-full">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            strokeWidth={i === accentRing ? 1.6 : 1}
            vectorEffect="non-scaling-stroke"
            className={i === accentRing ? "stroke-accent" : "stroke-line"}
          />
        ))}
        {/* Survey marker */}
        <g className="stroke-ink" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <line x1={marker.x - 8} y1={marker.y} x2={marker.x + 8} y2={marker.y} />
          <line x1={marker.x} y1={marker.y - 8} x2={marker.x} y2={marker.y + 8} />
        </g>
      </svg>
      {!small && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            {index !== undefined && <span className="text-accent">Note {String(index).padStart(2, "0")}</span>}
            {index !== undefined && tag && " · "}
            {tag}
          </p>
          {title && (
            <p className="max-w-[28ch] bg-surface/80 font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-ink sm:text-sm">
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCover;
