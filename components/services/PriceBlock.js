import { formatMoney } from "@/lib/money";

const per = (unit) => (unit ? ` / ${unit}` : "");

export default function PriceBlock({ pricing = [], note = "" }) {
  const lines = pricing.filter((p) => Number.isFinite(p.amount));

  if (lines.length === 0) {
    return (
      <div className="mt-6 max-w-md rounded-2xl border border-ink/10 bg-white/60 p-5">
        <p className="text-xs text-ink/50">Pricing</p>
        <p className="mt-1 font-display text-xl font-bold text-ink">Price on request</p>
        <p className="mt-1 text-sm text-ink/60">Send us the specs below and we&apos;ll quote within 24 hours.</p>
      </div>
    );
  }

  const lowest = lines.reduce((a, b) => (b.amount < a.amount ? b : a));
  const several = lines.length > 1;

  return (
    <div className="mt-6 max-w-md rounded-2xl border border-ink/10 bg-white/60 p-5">
      <p className="text-xs text-ink/50">{several ? "Starting from" : "Price"}</p>
      <p className="mt-1 font-display text-3xl font-bold text-ink">
        {formatMoney(lowest.amount)}
        <span className="text-base font-normal text-ink/50">{per(lowest.unit)}</span>
      </p>

      {(several || lines[0].label) && (
        <ul className="mt-4 divide-y divide-ink/10 border-t border-ink/10 text-sm">
          {lines.map((l, i) => (
            <li key={i} className="flex items-baseline justify-between gap-4 py-2">
              <span className="text-ink/70">{l.label || `Option ${i + 1}`}</span>
              <span className="font-medium text-ink">
                {formatMoney(l.amount)}
                {per(l.unit)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {note && <p className="mt-3 text-xs leading-relaxed text-ink/50">{note}</p>}
    </div>
  );
}