const Footer = () => {
  return (
    <footer className="border-t-2 border-stone-300 bg-stone-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex justify-between">
        <div>
          <p className="text-sm text-stone-400">Marinas</p>
        </div>
        <div>
          <p className="mt-2 text-sm text-stone-400">
            {" "}
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
