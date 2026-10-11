import { useEffect, useRef } from "react";

const focusableSelector = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
const controlClass =
  "min-h-11 border border-line bg-surface px-4 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink";

// Full-screen image viewer. Keyboard: ← → to move, Esc to close. Focus stays inside while open.
const Lightbox = ({ images, index, onIndexChange, onClose }) => {
  const dialogRef = useRef(null);
  const image = images[index];
  const count = images.length;

  const prev = () => onIndexChange((index - 1 + count) % count);
  const next = () => onIndexChange((index + 1) % count);

  // Keep the latest handlers for the keydown listener without re-binding it on every index change
  const handlers = useRef({ prev, next, onClose });
  useEffect(() => {
    handlers.current = { prev, next, onClose };
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.querySelector("[data-autofocus]")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.current.onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlers.current.prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handlers.current.next();
      } else if (e.key === "Tab") {
        const items = [...dialog.querySelectorAll(focusableSelector)];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot ${index + 1} of ${count}`}
      className="fixed inset-0 z-50 flex flex-col bg-bg"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          {image.caption && <span className="text-ink"> · {image.caption}</span>}
        </p>
        <button type="button" onClick={onClose} className={controlClass} data-autofocus>
          Close
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8">
        <img src={image.src} alt={image.alt} className="max-h-full max-w-full border border-line object-contain" />
      </div>

      {count > 1 && (
        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 sm:px-6">
          <button type="button" onClick={prev} className={controlClass} aria-label="Previous screenshot">
            ← Prev
          </button>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:block">
            ← → to move · Esc to close
          </p>
          <button type="button" onClick={next} className={controlClass} aria-label="Next screenshot">
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Lightbox;
