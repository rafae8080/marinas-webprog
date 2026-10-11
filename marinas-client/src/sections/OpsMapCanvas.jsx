// The Leaflet part of the Ops Map. Loaded with React.lazy only when the section scrolls into view (see OpsMap.jsx).
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

// OpenStreetMap standard tiles: free, no API key. (The CARTO basemaps in the plan now return an
// "API KEY REQUIRED" image.) Day/Night styling is a CSS filter on .ops-tiles in index.css, so a theme
// switch restyles the same tiles instead of downloading a second set.
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Accent dot + ping ring. Classes are Tailwind utilities (the ping stops when reduced motion is on).
const pinIcon = L.divIcon({
  className: "ops-pin",
  html:
    '<span class="relative flex size-4 items-center justify-center">' +
    '<span class="absolute inset-0 rounded-full bg-accent animate-radar-ping motion-reduce:hidden"></span>' +
    '<span class="relative size-3 rounded-full border-2 border-surface bg-accent"></span>' +
    "</span>",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -10],
});

// Scroll-wheel zoom stays off until the map is clicked, so the page scrolls normally past it
const WheelZoomOnClick = ({ onActivate }) => {
  const map = useMapEvents({
    click() {
      map.scrollWheelZoom.enable();
      onActivate();
    },
    mouseout() {
      map.scrollWheelZoom.disable();
    },
  });
  return null;
};

const OpsMapCanvas = ({ pins }) => {
  const [active, setActive] = useState(false);
  const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng])).pad(0.6);

  return (
    <div className="relative">
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={false}
        className="h-[22rem] w-full sm:h-[28rem]"
        attributionControl
      >
        <TileLayer url={tileUrl} attribution={attribution} maxZoom={19} className="ops-tiles" />
        <WheelZoomOnClick onActivate={() => setActive(true)} />
        {pins.map((pin) => (
          <Marker key={pin.code} position={[pin.lat, pin.lng]} icon={pinIcon} title={pin.label}>
            <Popup>
              <div className="ops-popup">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">{pin.code}</p>
                <p className="mt-1 font-display text-base font-medium tracking-[-0.02em] text-ink">{pin.label}</p>
                <p className="mt-1 text-sm leading-snug text-muted">{pin.text}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                  {pin.lat.toFixed(2)}°N {pin.lng.toFixed(2)}°E
                </p>
                {pin.link && (
                  <Link
                    viewTransition
                    to={pin.link.to}
                    className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
                  >
                    {pin.link.label} →
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {!active && (
        <p className="pointer-events-none absolute bottom-2 left-2 z-[400] border border-line bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Click the map to zoom with the scroll wheel
        </p>
      )}
    </div>
  );
};

export default OpsMapCanvas;
