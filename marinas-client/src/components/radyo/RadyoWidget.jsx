import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import RadyoAvatar from "./RadyoAvatar";

// The chat panel (Fuse + FAQ data) loads the first time RMO is opened
const RadyoPanel = lazy(() => import("./RadyoPanel"));

const SIZE = 64; // launcher (bubble) size in px
const FACE = 46; // RMO inside the bubble

// RMO launcher: a fixed face in the bottom-right corner whose eyes follow the cursor.
// Click or Enter opens the chat. Rendered by Layout (public pages only, not the dashboard).
const RadyoWidget = () => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const pupilsRef = useRef(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // The launcher is removed while the panel is open, so return focus to it after it renders again
  useEffect(() => {
    if (open) wasOpen.current = true;
    else if (wasOpen.current) buttonRef.current?.focus();
  }, [open]);

  // Eyes follow the cursor (one update per frame at most; off with reduced motion)
  useEffect(() => {
    if (reduce || open) return;
    let frame = 0;
    let last = null;
    const update = () => {
      frame = 0;
      const pupils = pupilsRef.current;
      if (!pupils || !last) return;
      const r = pupils.ownerSVGElement.getBoundingClientRect();
      // Eye centre: middle of the face's screen (viewBox 64: x 32, y 28)
      const ex = r.left + (r.width * 32) / 64;
      const ey = r.top + (r.height * 28) / 64;
      const dx = last.x - ex;
      const dy = last.y - ey;
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, len / 120); // eyes ease back to centre when the cursor is right on him
      pupils.setAttribute(
        "transform",
        `translate(${((dx / len) * 2.6 * reach).toFixed(2)} ${((dy / len) * 1.6 * reach).toFixed(2)})`,
      );
    };
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce, open]);

  return (
    <>
      {!open && (
        <div className="group fixed right-4 bottom-4 z-40" style={{ width: SIZE, height: SIZE }}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-full mr-2 hidden -translate-y-1/2 whitespace-nowrap border border-line bg-surface px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:block"
          >
            Ask RMO
          </span>
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ask RMO, the FAQ bot"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="flex h-full w-full items-center justify-center rounded-full border border-line bg-surface shadow-md transition-[transform,border-color] hover:border-ink motion-safe:hover:-translate-y-0.5"
          >
            <RadyoAvatar state="idle" size={FACE} pupilsRef={pupilsRef} />
          </button>
        </div>
      )}

      {open && (
        <Suspense fallback={null}>
          <RadyoPanel onClose={close} side="right" />
        </Suspense>
      )}
    </>
  );
};

export default RadyoWidget;
