import { useCallback, useSyncExternalStore } from "react";

// Theme lives on <html data-theme="day|night">. index.html sets it before React loads.
const STORAGE_KEY = "theme";
const listeners = new Set();

const readTheme = () =>
  document.documentElement.getAttribute("data-theme") === "night" ? "night" : "day";

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode etc.): the theme still applies for this visit.
  }
  listeners.forEach((listener) => listener());
};

const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "day");
  const toggle = useCallback(() => setTheme(readTheme() === "day" ? "night" : "day"), []);
  return { theme, toggle, setTheme };
};

export default useTheme;
