// Diagonal-stripe divider in the accent color. Use at most 3 times on the whole site (§B1.4).
const HazardRule = ({ className = "" }) => (
  <div
    role="separator"
    className={`h-2 w-full bg-[repeating-linear-gradient(-45deg,var(--accent)_0_6px,transparent_6px_12px)] ${className}`}
  />
);

export default HazardRule;
