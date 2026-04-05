import { Link } from "react-router-dom";
import Button from "./Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article) => (
        <article
          key={article.name}
          className="flex flex-col rounded-3xl border-2 border-stone-300 bg-stone-100 p-4"
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src={article.img}
              alt={article.alt}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
              {article.tag}
            </p>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-snug text-stone-900">
            {article.title}
          </h3>
          <p className="mt-3 grow text-sm leading-6 text-stone-500">
            {article.content[0].substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read Article</Button>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
