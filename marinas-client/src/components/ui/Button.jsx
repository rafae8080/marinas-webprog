import { Link } from "react-router-dom";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
  primary: "bg-accent text-on-accent hover:bg-accent-deep",
  secondary: "border border-line bg-surface text-ink hover:border-ink",
  ghost: "px-1 text-accent underline-offset-4 hover:underline",
};

// One button for internal links (to), external links (href) and plain buttons.
const Button = ({
  children,
  to,
  href,
  type = "button",
  variant = "secondary",
  className = "",
  ...rest
}) => {
  const classes = [base, variantClasses[variant] ?? variantClasses.secondary, className]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
