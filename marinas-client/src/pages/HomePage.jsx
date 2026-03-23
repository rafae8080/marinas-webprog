import Button from "../components/Button";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Hello, I'm Rafael
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              Building clean, functional web experiences from front to back.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-500 sm:text-base">
              I'm a full stack web developer and 3rd-year IT student
              specializing in web and mobile development. I design systems that
              are thoughtful, maintainable, and built to last.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                About Me
              </Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border-2 border-stone-300">
            <img
              src="web.jpg"
              alt="Developer working on code"
              className="h-full w-full object-cover"
              style={{ minHeight: "300px" }}
            />
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              By the numbers
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Work that speaks for itself
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "05", label: "Projects Created" },
              { num: "03", label: "Years in IT" },
              { num: "08+", label: "Technologies" },
              { num: "04", label: "Databases Used" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="rounded-3xl border-2 border-stone-300 bg-stone-100 p-5"
              >
                <p className="text-2xl font-bold text-stone-900">{num}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              What I do
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Three pillars of my development work
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "01 — Frontend",
                title: "Interfaces that feel right",
                desc: "I build responsive, accessible UIs using HTML, CSS, Tailwind, and JavaScript — with a keen eye for design systems and clean component structure.",
                img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
                alt: "Frontend development",
              },
              {
                tag: "02 — Backend",
                title: "Logic you can rely on",
                desc: "From PHP APIs to Java-based systems, I write server-side logic that handles real-world complexity — structured, maintainable, and secure.",
                img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
                alt: "Backend development",
              },
              {
                tag: "03 — Mobile",
                title: "Apps built for the go",
                desc: "Using Flutter, I craft cross-platform mobile apps with smooth UI and solid data integration — from shopping apps to social platforms.",
                img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
                alt: "Mobile development",
              },
            ].map(({ tag, title, desc, img, alt }) => (
              <article
                key={tag}
                className="flex flex-col rounded-3xl border-2 border-stone-300 bg-stone-100 p-4"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={img}
                    alt={alt}
                    className="aspect-4/3 w-full object-cover"
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                  {tag}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">
                  {title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-stone-500">
                  {desc}
                </p>
                <Button className="mt-4" variant="primary">
                  Learn More
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
