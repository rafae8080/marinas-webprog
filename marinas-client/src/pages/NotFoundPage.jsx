import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Signal lost · 404</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink">
        This route isn't on the map.
      </h1>
      <div className="mt-10">
        <Button to="/" variant="primary">
          Back to home
        </Button>
      </div>
    </section>
  );
}
