"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Placeholder filter data. Swap for real categories/prices once products exist.
const CATEGORIES = [
  "Flex Printing",
  "Vinyl Printing",
  "UV Printing",
  "Branding Solutions",
  "Signage & Display",
  "Laser Cutting",
  "CNC Cutting",
];
const AVAILABILITY = ["All", "Ready-made", "Made to order"];
const SORTS = [
  "Featured",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Name: A to Z",
];
const PRICE_MAX = 50000;
const SKELETON_COUNT = 8;
const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];

const BLUEPRINT = {
  backgroundImage:
    "linear-gradient(rgba(20,21,26,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,26,.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent)",
  maskImage: "linear-gradient(to bottom, #000 30%, transparent)",
};
const HALFTONE = {
  backgroundImage: "radial-gradient(rgba(20,21,26,.5) 1px, transparent 1.4px)",
  backgroundSize: "7px 7px",
};
const HALFTONE_LIGHT = {
  backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1px, transparent 1.4px)",
  backgroundSize: "8px 8px",
};

/* ───────────────────────── Skeleton pieces ───────────────────────── */

// Parent must be `relative overflow-hidden`
function Shimmer({ delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "250%" }}
      transition={{ duration: 1.8, delay, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
    />
  );
}

function Bar({ className = "", delay = 0 }) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-ink/[0.07] ${className}`}>
      <Shimmer delay={delay} />
    </div>
  );
}

function SkeletonCard({ i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-ink/10 bg-white/70 p-2.5 backdrop-blur-sm sm:p-3"
    >
      {/* image area */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/[0.05]">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={HALFTONE} />

        {/* faint registration mark in the middle */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-ink/15"
        >
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${DOTS[i % 4]}`} />
          <span className="h-1.5 w-8 rounded-full bg-ink/10 sm:w-10" />
        </div>
        <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80" />

        <Shimmer delay={i * 0.12} />
      </div>

      {/* text area (identical structure on every card, so rows stay aligned) */}
      <div className="px-1.5 pb-1.5 pt-4">
        <Bar className="h-2 w-1/3" delay={i * 0.12} />
        <Bar className="mt-3 h-3.5 w-11/12" delay={i * 0.12 + 0.1} />
        <Bar className="mt-2 h-3.5 w-2/3" delay={i * 0.12 + 0.15} />
        <div className="mt-5 flex items-center justify-between">
          <Bar className="h-4 w-1/4" delay={i * 0.12 + 0.2} />
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-ink/[0.07]">
            <Shimmer delay={i * 0.12 + 0.25} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ───────────────────────── Filters ───────────────────────── */

function GroupTitle({ children }) {
  return (
    <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">{children}</h3>
  );
}

function FilterPanel({ categories, toggleCategory, avail, setAvail, price, setPrice }) {
  return (
    <div className="space-y-8">
      <div>
        <GroupTitle>Category</GroupTitle>
        <ul className="mt-3 space-y-1">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-sm text-ink/80 transition-colors hover:bg-ink/[0.04]">
                <input
                  type="checkbox"
                  checked={categories.includes(c)}
                  onChange={() => toggleCategory(c)}
                  className="peer sr-only"
                />
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-ink/25 bg-white transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-cyan [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-paper" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {c}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <GroupTitle>Price</GroupTitle>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          step={500}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="mt-4 w-full accent-magenta"
        />
        <div className="mt-1 flex justify-between font-mono text-xs text-ink/60">
          <span>₹0</span>
          <span>{price >= PRICE_MAX ? "Any price" : `Up to ₹${price.toLocaleString("en-IN")}`}</span>
        </div>
      </div>

      <div>
        <GroupTitle>Type</GroupTitle>
        <div className="mt-3 flex flex-wrap gap-2">
          {AVAILABILITY.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvail(a)}
              aria-pressed={avail === a}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                avail === a
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink/40"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Launching-soon banner ───────────────────────── */

function LaunchBanner() {
  const reduce = useReducedMotion();
  const ticker = Array.from({ length: 10 });

  return (
    <section
      aria-labelledby="launch-title"
      className="relative mt-14 overflow-hidden rounded-[2rem] bg-ink text-paper md:mt-20 md:rounded-[2.5rem]"
    >
      {/* glows + halftone */}
      <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-magenta/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={HALFTONE_LIGHT} />

      {/* ticker */}
      <div className="relative overflow-hidden border-b border-white/10 py-3">
        <motion.div
          className="flex w-max items-center"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {[...ticker, ...ticker].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-4 pr-4 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/70"
            >
              Launching soon
              <i className={`h-1.5 w-1.5 rounded-full ${DOTS[i % 4] === "bg-ink" ? "bg-paper" : DOTS[i % 4]}`} />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative grid items-center gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr] md:px-12 md:py-16">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
            </span>
            Store status: launching soon
          </p>

          <h2
            id="launch-title"
            className="mt-6 font-display text-[clamp(2rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-tight"
          >
            Our store is
            <br />
            almost <span className="text-yellow">ready.</span>
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/70">
            Online ordering for ready-made signage, printed goods and fabrication
            pieces opens soon. Until then, we're taking custom orders and quotes
            directly. Tell us what you need and we'll plan it with you.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Request a custom order
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-white/60"
            >
              Browse our services
            </Link>
          </div>
        </div>

        {/* rotating CMYK rings */}
        <div aria-hidden className="relative mx-auto aspect-square w-48 sm:w-56 md:w-full md:max-w-[17rem]">
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            fill="none"
          >
            <circle cx="100" cy="100" r="92" stroke="#00B8D9" strokeWidth="6" strokeLinecap="round" strokeDasharray="120 460" />
            <circle cx="100" cy="100" r="72" stroke="#E8368F" strokeWidth="6" strokeLinecap="round" strokeDasharray="90 360" />
            <circle cx="100" cy="100" r="52" stroke="#FFC400" strokeWidth="6" strokeLinecap="round" strokeDasharray="60 270" />
          </motion.svg>
          <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
            <span className="font-display text-xl font-bold tracking-tight sm:text-2xl">SOON</span>
            <span className="mt-0.5 flex overflow-hidden rounded-sm">
              <i className="h-1.5 w-4 bg-cyan" />
              <i className="h-1.5 w-4 bg-magenta" />
              <i className="h-1.5 w-4 bg-yellow" />
              <i className="h-1.5 w-4 bg-paper" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Page body ───────────────────────── */

export default function StorePreview() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(SORTS[0]);
  const [categories, setCategories] = useState([]);
  const [avail, setAvail] = useState("All");
  const [price, setPrice] = useState(PRICE_MAX);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleCategory = (c) =>
    setCategories((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const clearAll = () => {
    setQuery("");
    setCategories([]);
    setAvail("All");
    setPrice(PRICE_MAX);
  };

  const activeCount =
    categories.length + (avail !== "All" ? 1 : 0) + (price < PRICE_MAX ? 1 : 0);
  const interacted = activeCount > 0 || query.trim() !== "";

  // lock page scroll while the mobile filter sheet is open
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 120);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSheetOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filterProps = { categories, toggleCategory, avail, setAvail, price, setPrice };

  return (
    <div className="relative mx-auto max-w-7xl px-6">
      {/* solid band behind the navbar once the toolbar is stuck, so cards can't show through */}
<div
  aria-hidden
  className={`pointer-events-none fixed inset-x-0 top-0 z-[35] hidden h-20 border-b border-ink/5 bg-paper/95 backdrop-blur-md transition-opacity duration-300 md:block ${
    scrolled ? "opacity-100" : "opacity-0"
  }`}
/>
      {/* blueprint grid behind the header */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[34rem]" style={BLUEPRINT} />

      {/* header */}
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
          Corp Prints <span className="text-ink/30">/</span> Store
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
          <h1 className="font-display text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight text-ink">
            Store
          </h1>
          <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur md:mb-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-magenta opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-magenta" />
            </span>
            Launching soon
          </span>
        </div>
        <div className="mt-6 flex h-1 w-40 overflow-hidden rounded-full">
          {DOTS.map((c) => (
            <span key={c} className={`h-full flex-1 ${c}`} />
          ))}
        </div>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
          Ready-made signage, printed goods and fabrication pieces, all in one
          place. The catalogue is being set up right now.
        </p>
      </header>

      {/* toolbar */}
      <div className="mt-10 border-b border-ink/5 bg-paper/80 py-3 backdrop-blur-md md:sticky md:top-[4.75rem] md:z-30">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* search */}
          <div className="relative md:flex-1">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search signage, banners, acrylic…"
              aria-label="Search the store"
              className="w-full rounded-full border border-ink/15 bg-white py-3 pl-11 pr-11 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink/40 focus:ring-2 focus:ring-cyan/25 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-ink/5 text-ink/60 transition-colors hover:bg-ink hover:text-paper"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {/* mobile/tablet filter button */}
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-magenta px-1 text-[11px] text-paper">
                  {activeCount}
                </span>
              )}
            </button>

            {/* sort */}
            <div className="relative flex-1 md:w-60 md:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="w-full appearance-none rounded-full border border-ink/15 bg-white py-3 pl-5 pr-10 text-sm text-ink outline-none transition-colors focus:border-ink/40 focus:ring-2 focus:ring-cyan/25"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    Sort: {s}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* friendly note once someone tries the controls */}
      <AnimatePresence initial={false}>
        {interacted && (
          <motion.p
            key="note"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <span className="mt-4 flex items-start gap-3 rounded-2xl border border-yellow/60 bg-yellow/15 px-4 py-3 text-sm text-ink/80">
              <i className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-yellow" />
              The catalogue is still loading. Your search and filters will apply as soon as the first products go live.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      {/* sidebar + grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[16.5rem_1fr] lg:items-start lg:gap-10">
        {/* desktop filters */}
        <aside className="hidden lg:sticky lg:top-44 lg:block">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-lg text-ink">Filters</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-magenta underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <FilterPanel {...filterProps} />
        </aside>

        <div>
          {/* result line + active chips */}
          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/50">
              0 products <span className="text-ink/25">·</span> catalogue syncing
            </p>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1 text-xs text-ink transition-colors hover:border-ink/40"
              >
                {c}
                <span aria-hidden className="text-ink/40">×</span>
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
          </div>

          {/* skeleton grid */}
          <div className="relative" aria-busy="true">
            <p role="status" className="sr-only">
              The store catalogue is loading. Products are launching soon.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonCard key={i} i={i} />
              ))}
            </div>
            {/* fade the last row into the page so the banner takes over */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/70 to-transparent"
            />
          </div>
        </div>
      </div>

      <LaunchBanner />

      {/* mobile / tablet filter sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-3xl bg-paper px-6 pt-6 sm:left-auto sm:right-0 sm:top-0 sm:max-h-none sm:w-[22rem] sm:rounded-none sm:rounded-l-3xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl text-ink">Filters</h2>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <FilterPanel {...filterProps} />

              <div className="sticky bottom-0 -mx-6 mt-8 flex gap-3 border-t border-ink/10 bg-paper/95 px-6 py-4 backdrop-blur">
                <button
                  type="button"
                  onClick={clearAll}
                  className="flex-1 rounded-full border border-ink/15 py-3 text-sm font-medium text-ink"
                >
                  Clear all
                </button>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  className="flex-1 rounded-full bg-ink py-3 text-sm font-medium text-paper"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}