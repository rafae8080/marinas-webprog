// RMO, the field-radio mascot: an inline SVG walkie-talkie face in the accent red.
// state: "idle" (blinks every ~4s) | "listening" (antenna LED pulses) | "thinking" (signal arcs) | "happy" (^ ^ eyes)
// `still` turns animation off and hides it from screen readers (the small avatars in chat bubbles).
// `pupilsRef` lets the launcher move the eyes toward the cursor without re-rendering.
// Colors come from the design tokens, so it follows Day/Night. Animations stop with reduced motion (index.css).
const labels = {
  idle: "RMO, the field radio",
  listening: "RMO is listening",
  thinking: "RMO is thinking",
  happy: "RMO is happy",
};

const RadyoAvatar = ({ state = "idle", size = 56, still = false, pupilsRef, className = "" }) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    {...(still ? { "aria-hidden": true } : { role: "img", "aria-label": labels[state] ?? labels.idle })}
    className={className}
  >
    {/* Signal arcs from the antenna tip (thinking) */}
    {state === "thinking" &&
      [6, 10, 14].map((r, i) => (
        <path
          key={r}
          d={`M${40 + r * 0.7} ${8 - r * 0.7} A${r} ${r} 0 0 1 ${40 + r * 0.7} ${8 + r * 0.7}`}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className={`stroke-accent ${still ? "" : "animate-radyo-arc"}`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}

    {/* Antenna + LED (light, so it shows against the red body) */}
    <line x1="40" y1="8" x2="40" y2="16" strokeWidth="3" strokeLinecap="round" className="stroke-accent-deep" />
    <circle
      cx="40"
      cy="7"
      r="3.5"
      strokeWidth="1.5"
      className={`fill-surface stroke-accent-deep ${state === "listening" && !still ? "animate-radyo-led" : ""}`}
    />

    {/* Body */}
    <rect x="14" y="15" width="36" height="45" rx="8" className="fill-accent" />

    {/* Screen */}
    <rect x="19" y="20" width="26" height="16" rx="3" className="fill-surface" />

    {/* Eyes */}
    {state === "happy" ? (
      <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink">
        <polyline points="24,30 26.5,26.5 29,30" />
        <polyline points="35,30 37.5,26.5 40,30" />
      </g>
    ) : (
      <g ref={pupilsRef}>
        <g className={state === "idle" && !still ? "animate-radyo-blink" : ""}>
          <rect x="25" y="25" width="3.5" height="5" className="fill-ink" />
          <rect x="35.5" y="25" width="3.5" height="5" className="fill-ink" />
        </g>
      </g>
    )}

    {/* Speaker grille */}
    <g strokeWidth="2" strokeLinecap="round" className="stroke-surface">
      <line x1="22" y1="43" x2="42" y2="43" />
      <line x1="22" y1="48" x2="42" y2="48" />
      <line x1="22" y1="53" x2="42" y2="53" />
    </g>
  </svg>
);

export default RadyoAvatar;
