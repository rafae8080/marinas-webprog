import useTheme from "../hooks/useTheme";

const options = [
  { value: "day", label: "DAY" },
  { value: "night", label: "NIGHT" },
];

// Map-legend style switch: DAY / NIGHT
const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={`inline-flex items-center border border-line font-mono text-[11px] uppercase tracking-[0.12em] ${className}`}
    >
      {options.map((option, i) => {
        const active = theme === option.value;
        return (
          <span key={option.value} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted">
                /
              </span>
            )}
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setTheme(option.value)}
              className={`min-h-8 px-2.5 py-1 transition-colors ${
                active ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
