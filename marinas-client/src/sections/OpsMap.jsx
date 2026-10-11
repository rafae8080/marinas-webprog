import { lazy, Suspense } from "react";
import CornerMarks from "../components/ui/CornerMarks";
import SectionHeader from "../components/ui/SectionHeader";
import { coords, mapPins } from "../data/site";
import useInView from "../hooks/useInView";
import Section from "./Section";

// Leaflet + tiles load only once this section is near the viewport
const OpsMapCanvas = lazy(() => import("./OpsMapCanvas"));

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

const MapFallback = () => (
  <div className="flex h-[22rem] items-center justify-center bg-bg sm:h-[28rem]">
    <span className={label}>Loading map…</span>
  </div>
);

const OpsMap = () => {
  const [ref, inView] = useInView({ rootMargin: "200px 0px" });

  return (
    <Section id="map">
      <SectionHeader
        code="SEC-03"
        title="Ops Map"
        coords={coords.label}
        kicker="Where the work happens. City-level pins only."
      />

      <div ref={ref} className="relative mt-8 border border-line bg-surface p-2">
        <CornerMarks />
        <div role="region" aria-label="Ops map. The same pins are listed below.">
          {inView ? (
            <Suspense fallback={<MapFallback />}>
              <OpsMapCanvas pins={mapPins} />
            </Suspense>
          ) : (
            <MapFallback />
          )}
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2" aria-label="Map pins">
        {mapPins.map((pin) => (
          <li key={pin.code} className="flex gap-3 border-t border-line pt-3">
            <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
            <div>
              <p className={label}>
                <span className="text-accent">{pin.code}</span> · {pin.lat.toFixed(2)}°N {pin.lng.toFixed(2)}°E
              </p>
              <p className="mt-1 font-display text-lg font-medium tracking-[-0.02em] text-ink">{pin.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{pin.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default OpsMap;
