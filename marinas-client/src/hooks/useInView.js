import { useEffect, useRef, useState } from "react";

// Returns [ref, inView]. With `once` (default) it stays true after the element first appears.
const useInView = ({ once = true, rootMargin = "0px 0px -10% 0px", threshold = 0 } = {}) => {
  const ref = useRef(null);
  // Without IntersectionObserver support, just show everything
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
};

export default useInView;
