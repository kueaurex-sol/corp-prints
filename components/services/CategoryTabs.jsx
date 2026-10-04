"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "@/data/services";

const INKS = ["#00AEEF", "#EC008C", "#FFF200", "#14151A"];

export default function CategoryTabs() {
  const [active, setActive] = useState(SERVICES[0].slug);
  const activeCategory = SERVICES.find((c) => c.slug === active);
  const activeIndex = SERVICES.findIndex((c) => c.slug === active);

  return (
    <div>
      {/* tab bar */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
        {SERVICES.map((cat, i) => {
          const isActive = cat.slug === active;
          return (
            <button
              key={cat.slug}
              onClick={() => setActive(cat.slug)}
              className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="active-category-pill"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{ background: INKS[i % INKS.length] }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "text-paper" : "text-ink/60 hover:text-ink"}`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* stacked-card content area, echoing the aceternity tabs deck look */}
      <div className="relative mt-8">
        {/* decorative cards peeking out behind the active panel */}
        <div className="absolute inset-x-4 -top-3 h-full rounded-[2rem] border border-ink/10 bg-white/60" aria-hidden="true" />
        <div className="absolute inset-x-8 -top-6 h-full rounded-[2rem] border border-ink/10 bg-white/40" aria-hidden="true" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] border border-ink/10 bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(20,21,26,0.3)] md:p-10"
          >
            <p className="font-display text-xs uppercase tracking-[0.25em] text-ink/40">
              0{activeIndex + 1} — {activeCategory.types.length} services
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink md:text-3xl">{activeCategory.name}</h3>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeCategory.types.map((t) => (
                <Link
                  key={t.slug}
                  href={`/services/${activeCategory.slug}/${t.slug}`}
                  className="group rounded-2xl border border-ink/10 bg-white/70 p-5 transition-colors hover:border-ink/30 hover:bg-white"
                >
                  <h4 className="font-display text-base text-ink">{t.name}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{t.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 transition-colors group-hover:text-ink">
                    Request a quote <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}