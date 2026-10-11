import * as m from "motion/react-m";

// Staggered reveal (§B1.5): children rise + fade in, 60ms apart, once, when the group scrolls into view.
// Reduced motion: MotionConfig (main.jsx) keeps the fade and drops the rise.
// Transforms + opacity only, so nothing shifts the layout.
const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// `as`: which element to render. Defined once here so components are never created during render.
const tags = { div: m.div, ul: m.ul, ol: m.ol, li: m.li };

export const RevealGroup = ({ as = "div", children, ...rest }) => {
  const Tag = tags[as] ?? tags.div;
  return (
    <Tag variants={groupVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px 0px -10% 0px" }} {...rest}>
      {children}
    </Tag>
  );
};

export const RevealItem = ({ as = "div", children, ...rest }) => {
  const Tag = tags[as] ?? tags.div;
  return (
    <Tag variants={itemVariants} {...rest}>
      {children}
    </Tag>
  );
};
