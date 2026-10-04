import CategoryTabs from "@/components/services/CategoryTabs";

export const metadata = { title: "Services | Corp Prints" };

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-paper pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-ink/50">Corp Prints</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Services
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">
          Seven verticals, one roof. Pick a category to see everything under it — tap any
          service to request a quote.
        </p>
        <div className="mt-4 flex h-1 w-40 overflow-hidden rounded-full">
          {["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"].map((c) => (
            <span key={c} className={`h-full flex-1 ${c}`} />
          ))}
        </div>

        <div className="mt-14">
          <CategoryTabs />
        </div>
      </div>
    </main>
  );
}