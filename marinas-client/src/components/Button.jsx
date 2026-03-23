import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-gradient-to-b from-stone-100/90 to-stone-300/80 text-stone-900 backdrop-blur hover:from-stone-200 hover:to-stone-400",
  secondary:
    "bg-gradient-to-b from-stone-50/90 to-stone-200/80 text-stone-900 backdrop-blur hover:from-stone-100 hover:to-stone-300",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-zinc-300 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
