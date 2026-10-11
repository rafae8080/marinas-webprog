// Shared page-width wrapper for Home sections. `id` doubles as the #anchor (e.g. /#contact).
const Section = ({ id, className = "", children, ...rest }) => (
  <section id={id} className={`mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 md:py-24 lg:px-8 ${className}`} {...rest}>
    {children}
  </section>
);

export default Section;
