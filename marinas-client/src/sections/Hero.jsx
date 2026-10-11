import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { heroPaths, heroViewBox } from "../assets/heroContours";
import Button from "../components/ui/Button";
import CornerMarks from "../components/ui/CornerMarks";
import { coords } from "../data/site";
import Section from "./Section";

// §D2 option A (chosen by Rafael) + the shared subline
const headline = "I build systems that keep working when the network doesn't.";
const subline =
  "Full-stack developer (MERN · Next.js · PHP) and Flutter dev from Marikina. BSIT at National University, 8× Dean's Lister.";

// The lint config can't see <motion.path> in JSX, so give these capitalized names
const MotionPath = motion.path;
const MotionSpan = motion.span;

// The hero plays its entrance once per browser session; after that it renders still
const SESSION_KEY = "hero-played";
const isFirstPlay = () => {
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
};

// Headline revealed word by word: rise + fade, staggered (§B1.5). ~1.1s total.
// With reduced motion, MotionConfig (main.jsx) drops the rise and keeps the fade.
const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const wordVariants = {
  hidden: { opacity: 0, y: "0.35em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const Headline = ({ play }) => {
  const words = headline.split(" ");
  return (
    <MotionSpan className="block" variants={lineVariants} initial={play ? "hidden" : false} animate="visible">
      {words.map((word, i) => (
        <Fragment key={i}>
          <MotionSpan className="inline-block" variants={wordVariants}>
            {word}
          </MotionSpan>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionSpan>
  );
};

// Contour lines that draw themselves in (§B1.5, 1.2s). Reduced motion: fade in only.
const Contours = ({ play }) => {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox={heroViewBox}
      aria-hidden="true"
      className="pointer-events-none absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] text-line"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid slice"
    >
      {heroPaths.map((d, i) => (
        <MotionPath
          key={d}
          d={d}
          initial={!play ? false : reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0.4 : 1.2, delay: reduce ? 0 : (i % 12) * 0.03, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
};

const Hero = () => {
  const [play] = useState(isFirstPlay);
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage blocked: it just plays again next time
    }
  }, []);

  return (
    <Section id="top" className="grid items-center gap-14 overflow-x-clip pt-12 md:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">SEC-01</span> // IDENT
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
          <Headline play={play} />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{subline}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/work" variant="primary">
            View case files
          </Button>
          <Button to="/#contact" variant="secondary">
            Contact
          </Button>
        </div>
      </div>

      {/* Field ID card */}
      <div className="relative mx-auto w-full max-w-sm">
        <Contours play={play} />
        <figure className="relative border border-line bg-surface p-3">
          <CornerMarks />
          <div className="flex items-center justify-between pb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            <span>Field ID</span>
            <span>{coords.label}</span>
          </div>
          {/* TODO(rafael): replace with a better portrait (npm run portrait, see scripts/make-portrait.mjs) */}
          <img
            src="/images/me/portrait.webp"
            alt="Rafael Marinas"
            width="720"
            height="900"
            className="aspect-[4/5] w-full border border-line object-cover"
          />
          <figcaption className="flex items-center justify-between gap-3 pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            <span>ID · R. Marinas · Full-stack</span>
            <span className="text-muted">{coords.short}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
};

export default Hero;
