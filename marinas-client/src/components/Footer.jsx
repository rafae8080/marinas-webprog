const Footer = () => {
  return (
    <footer className="border-t-2 border-stone-300 bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
          Rafael Marinas
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-300">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
