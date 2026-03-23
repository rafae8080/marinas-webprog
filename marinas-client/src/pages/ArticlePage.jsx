import Button from "../components/Button";

const articles = [
  {
    id: "01",
    tag: "Web Development",
    title: "Why clean folder structure saves future you",
    excerpt:
      "A messy codebase is a ticking clock. Good project structure isn't about aesthetics — it's about how fast you can move six months from now.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    alt: "Code on a screen",
    readTime: "4 min read",
  },
  {
    id: "02",
    tag: "Design Systems",
    title: "Building UI components you'll actually reuse",
    excerpt:
      "Reusable components only work if they're built with flexibility in mind. Here's how I approach component design so it scales without breaking.",
    img: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&q=80",
    alt: "UI components on screen",
    readTime: "6 min read",
  },
  {
    id: "03",
    tag: "Mobile Dev",
    title: "What building a Flutter app taught me about state",
    excerpt:
      "State management trips up a lot of beginners. Working on real mobile apps in Flutter changed how I think about data flow entirely.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
    alt: "Mobile app development",
    readTime: "5 min read",
  },
  {
    id: "04",
    tag: "Databases",
    title: "SQL vs NoSQL — what I learned from using both",
    excerpt:
      "Having worked with MySQL, MSSQL, and MongoDB Atlas, I've felt firsthand when each one shines and when it gets in your way.",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
    alt: "Database visualization",
    readTime: "7 min read",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Articles
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
              Writing on code, tools, and lessons learned.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-stone-500 sm:text-base">
              Practical notes and personal takes on web development, mobile
              apps, databases, and what I pick up building real projects as a
              student developer.
            </p>
            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border-2 border-stone-300">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80"
              alt="Laptop and notes on a desk"
              className="h-56 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 hover">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Latest writing
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {articles.map((a) => (
              <article
                key={a.id}
                className="flex flex-col rounded-3xl border-2 border-stone-300 bg-stone-100 p-4"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={a.img}
                    alt={a.alt}
                    className="aspect-4/3 w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
                    {a.tag}
                  </p>
                  <span className="text-[10px] text-stone-300">
                    {a.readTime}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug text-stone-900">
                  {a.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-stone-500">
                  {a.excerpt}
                </p>
                <Button className="mt-4">Read Article</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border-2 border-stone-300 bg-stone-800 px-8 py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Newsletter
            </p>
            <h2 className="mt-3 max-w-sm text-2xl font-bold leading-snug text-stone-50 sm:text-3xl">
              Dev notes, straight to your inbox.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-stone-400">
              No spam. Just honest writing about building things — from student
              projects to full stack systems — whenever I have something worth
              sharing.
            </p>
            <div className="mt-6">
              <Button variant="secondary">Subscribe Free</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
