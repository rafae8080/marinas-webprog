import { useEffect, useState } from "react";
import { contact, coords } from "../data/site";
import StatusDot from "./ui/StatusDot";

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: coords.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const Sep = () => (
  <span aria-hidden="true" className="text-line">
    ·
  </span>
);

// RAFAEL MARINAS · 14.65°N 121.10°E · MARIKINA · ● AVAILABLE FOR WORK · 14:32 PHT
const StatusBar = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-line bg-bg">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:px-6 lg:px-8">
        <span className="text-ink">{contact.name}</span>
        <span className="hidden items-center gap-3 md:flex">
          <Sep />
          <span>{coords.label}</span>
          <Sep />
          <span>{coords.short}</span>
        </span>
        <Sep />
        <StatusDot label="Available for work" />
        <span className="hidden items-center gap-3 md:flex">
          <Sep />
          <time dateTime={now.toISOString()} aria-label="Current time in Manila">
            {clockFormat.format(now)} PHT
          </time>
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
