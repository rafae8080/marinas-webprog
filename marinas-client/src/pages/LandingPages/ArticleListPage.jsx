import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";
import articles from "../../assets/article-content";

const ArticleListPage = () => {
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
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Featured Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">
              Latest writing
            </h2>
          </div>

          <ArticleList articles={articles} />
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

export default ArticleListPage;
