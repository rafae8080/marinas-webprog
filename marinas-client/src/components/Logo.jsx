// Site logo: a contour-map mark (three topographic rings around a red survey point) + the name.
// Drawn in SVG with theme tokens, so it follows Day/Night without a separate image.

export const LogoMark = ({ size = 32, className = "" }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className={className}>
    <g fill="none" strokeLinejoin="round" className="stroke-ink">
      <path strokeWidth="1.6" d="M16 3.4c6 0 12.2 3.7 12.6 10.4.5 7-4.7 14.8-12.2 15C9.1 29 3.4 23.6 3.5 16.4 3.6 9.1 9.5 3.4 16 3.4Z" />
      <path strokeWidth="1.4" d="M16.4 8.1c4.1 0 7.8 2.7 7.9 7.1.1 4.7-3.4 9.1-8.2 9.1-4.4 0-7.4-3.3-7.3-7.4.1-4.7 3.3-8.8 7.6-8.8Z" />
      <path strokeWidth="1.2" d="M16.2 12.3c2.1 0 3.7 1.5 3.7 3.7 0 2.4-1.8 4.1-3.9 4.1-2 0-3.4-1.5-3.4-3.5 0-2.4 1.5-4.3 3.6-4.3Z" />
    </g>
    <circle cx="16.1" cy="16.1" r="1.9" className="fill-accent" />
  </svg>
);

const Logo = ({ compact = false }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark size={compact ? 28 : 32} />
    <span className="flex flex-col leading-none">
      <span className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-ink">Rafael Marinas</span>
      {!compact && (
        <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">Full-stack · Flutter</span>
      )}
    </span>
  </span>
);

export default Logo;
