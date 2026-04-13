import Button from "../../components/Button";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border-2 border-stone-300">
            <img
              src="raf1.jfif"
              alt="Developer at work"
              className="h-full w-full object-cover object-top"
              style={{ minHeight: "340px" }}
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              About Me
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              Hi, I'm Rafael Marinas — full stack developer in the making.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-500 sm:text-base">
              I'm a 3rd-year Information Technology student specializing in web
              and mobile development. I enjoy building complete, functional
              systems — from designing interfaces in Figma to deploying backend
              logic and wiring up databases.
            </p>
            <p className="mt-3 max-w-lg text-sm leading-7 text-stone-500 sm:text-base">
              Whether it's a web app or a mobile experience, I care about
              writing clean code, following solid architecture, and shipping
              things that actually work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              At a glance
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              3rd year. Real projects.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "03", label: "Years in IT" },
              { num: "05", label: "Projects Built" },
              { num: "08+", label: "Tech Stack" },
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

      {/* Experience + Skills */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Background
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Projects &amp; skills
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Projects */}
            <div className="space-y-4">
              {[
                {
                  title: "Apartment Rental System",
                  type: "Web App",
                  desc: "A full stack rental management system handling tenant records, unit availability, and billing — built with PHP and MSSQL.",
                },
                {
                  title: "Gym Exercise Queue System",
                  type: "Web App",
                  desc: "A scheduling and queue management tool for gym equipment usage, ensuring fair access and reducing congestion on the floor.",
                },
                {
                  title: "Bulldogs Exchange",
                  type: "Mobile App",
                  desc: "A Flutter-based shopping mobile app with product listings, user authentication, and cart functionality backed by a cloud database.",
                },
                {
                  title: "Facebook Replication",
                  type: "Mobile App",
                  desc: "A social media mobile app replicating core Facebook features — posts, profiles, and a live feed — built with Flutter.",
                },
                {
                  title: "Hospital Management System",
                  type: "Web App",
                  desc: "A comprehensive system managing patient records, appointments, and staff data for a simulated hospital environment.",
                },
              ].map(({ title, type, desc }) => (
                <article
                  key={title}
                  className="rounded-3xl border-2 border-stone-300 bg-stone-100 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-stone-900">
                        {title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 whitespace-nowrap">
                      {type}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-500">
                    {desc}
                  </p>
                </article>
              ))}
            </div>

            {/* Skills */}
            <div className="rounded-3xl border-2 border-stone-300 bg-stone-100 p-5">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
                Tech Stack
              </p>

              {[
                {
                  area: "Frontend & Design",
                  chips: ["HTML", "CSS", "JavaScript", "Tailwind", "Figma"],
                },
                {
                  area: "Backend & Mobile",
                  chips: ["PHP", "Java", "Flutter"],
                },
                {
                  area: "Databases",
                  chips: ["MySQL", "MSSQL", "MongoDB Atlas", "Supabase"],
                },
                {
                  area: "Specialization",
                  chips: ["Web Dev", "Mobile Dev"],
                },
              ].map(({ area, chips }) => (
                <div key={area} className="mb-5">
                  <p className="mb-2 text-xs font-semibold text-stone-700">
                    {area}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border-2 border-stone-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-700"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-4 overflow-hidden rounded-2xl border-2 border-stone-200">
                <img
                  src="full_stack.jpg"
                  alt="Coding on a monitor"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
