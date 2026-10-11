const positions = [
  "-top-[7px] -left-[5px]",
  "-top-[7px] -right-[5px]",
  "-bottom-[7px] -left-[5px]",
  "-bottom-[7px] -right-[5px]",
];

// Small "+" registration marks on each corner. The parent needs `relative`.
const CornerMarks = ({ className = "text-muted" }) =>
  positions.map((position) => (
    <span
      key={position}
      aria-hidden="true"
      className={`pointer-events-none absolute ${position} select-none font-mono text-xs leading-none ${className}`}
    >
      +
    </span>
  ));

export default CornerMarks;
