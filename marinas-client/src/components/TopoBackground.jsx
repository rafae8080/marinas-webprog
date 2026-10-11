// Contour lines from public/topo.svg. The SVG is used as a mask over a --line fill, so the color follows the theme.
const mask = {
  maskImage: "url(/topo.svg)",
  WebkitMaskImage: "url(/topo.svg)",
  maskSize: "cover",
  WebkitMaskSize: "cover",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

const TopoBackground = ({ fixed = true, className = "opacity-35" }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none ${fixed ? "fixed" : "absolute"} inset-0 -z-10 bg-line ${className}`}
    style={mask}
  />
);

export default TopoBackground;
