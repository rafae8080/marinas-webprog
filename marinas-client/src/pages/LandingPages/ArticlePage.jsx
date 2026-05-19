import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { fetchArticleByName } from "../../services/ArticleService";

function ArticlePage() {
  const { name } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchArticleByName(name)
      .then(({ data }) => setArticle(data.article))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="py-20 text-center text-stone-400">Loading…</div>;
  if (notFound || !article) return (
    <div className="py-20 text-center text-stone-400">
      <p className="text-lg font-semibold">Article not found.</p>
      <div className="mt-4"><Button to="/articles">← Back to Articles</Button></div>
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Article Header */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
            {article.tag}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-stone-400">{article.readTime}</p>
        </div>
      </section>

      {/* Article Body */}
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {article.img && (
            <div className="overflow-hidden rounded-3xl border-2 border-stone-300 mb-8">
              <img
                src={article.img}
                alt={article.alt}
                className="h-72 w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-sm max-w-none space-y-4 text-stone-700">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-7 text-stone-700 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-stone-300 pt-6">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
