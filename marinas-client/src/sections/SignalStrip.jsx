import Counter from "../components/ui/Counter";
import HazardRule from "../components/ui/HazardRule";
import { metrics } from "../data/site";

// Five real numbers from §B2, each with a tiny source label
const SignalStrip = () => (
  <section aria-label="Key numbers" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <HazardRule />
    <dl className="grid grid-cols-2 border-x border-b border-line bg-surface sm:grid-cols-3 lg:grid-cols-5">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="flex flex-col-reverse justify-end gap-2 border-b border-line p-5 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
        >
          <dt>
            <span className="block text-sm leading-snug text-ink">{m.label}</span>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              SRC · {m.source}
            </span>
          </dt>
          <dd className="font-display text-4xl font-medium tracking-[-0.02em] text-ink">
            <Counter value={m.value} decimals={m.decimals} suffix={m.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default SignalStrip;
