import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-stone-300 bg-stone-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
            404
          </p>
          <h1 className="text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
            Page not found.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-500 sm:text-base">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="mt-6">
            <Button to="/">Back Home</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
