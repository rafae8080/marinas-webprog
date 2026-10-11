import { useEffect, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import useInView from "../../hooks/useInView";

const format = (n, decimals) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Counts up once when it scrolls into view. Screen readers get the final value only.
const Counter = ({ value, suffix = "", decimals = 0, duration = 1.2, className = "" }) => {
  const [ref, inView] = useInView();
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  const shown = reduceMotion ? value : display;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">
        {format(shown, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value, decimals)}
        {suffix}
      </span>
    </span>
  );
};

export default Counter;
