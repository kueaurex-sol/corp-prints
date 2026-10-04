"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

// Placeholder copy: swap for real client quotes and photos (image: "/testimonials/x.jpg")
const ITEMS = [
  {
    head: "Delivered before the launch",
    quote:
      "Our facade branding went up on schedule and looked exactly like the proof.",
    name: "Client Name",
    role: "Marketing Head, Company A",
    g: "linear-gradient(135deg,#00AEEF,#fff)",
  },
  {
    head: "Colour we could trust",
    quote:
      "The UV prints on acrylic came out crisp, and the whites were properly opaque.",
    name: "Client Name",
    role: "Store Manager, Company B",
    g: "linear-gradient(135deg,#EC008C,#fff)",
  },
  {
    head: "One team, start to finish",
    quote:
      "Design, cutting, lighting and install were handled by one team. It saved us weeks.",
    name: "Client Name",
    role: "Director, Company C",
    g: "linear-gradient(135deg,#FFF200,#fff)",
  },
  {
    head: "Signage that stands out",
    quote:
      "Our LED signage is the first thing people mention when they find us.",
    name: "Client Name",
    role: "Owner, Company D",
    g: "linear-gradient(135deg,#00AEEF,#EC008C)",
  },
];
const MS = 6000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const n = ITEMS.length;
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % n), MS);
    return () => clearTimeout(t);
  }, [i, n]);
  const at = (o) => ITEMS[(i + o + n) % n];
  const t = ITEMS[i];

  const Side = ({ o, tall }) => (
    <button
      onClick={() => setI((i + o + n) % n)}
      aria-label={at(o).name}
      className={`hidden shrink-0 rounded-[2rem] bg-white p-3 shadow-md transition-transform hover:scale-105 lg:block ${tall ? "h-72 w-28" : "h-52 w-20 opacity-70"}`}
    >
      <span
        className="block h-full w-full rounded-[1.4rem]"
        style={{ background: at(o).g }}
      />
    </button>
  );

  return (
    <section
      className="py-20"
      style={{
        background:
          "linear-gradient(180deg,transparent,rgba(0,174,239,.10),rgba(236,0,140,.10),rgba(255,242,0,.12))",
      }}
    >
      <Reveal className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-center gap-4">
          <Side o={-2} />
          <Side o={-1} tall />
          <div className="grid min-h-[420px] w-full max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-xl md:grid-cols-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                className="contents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
                  <h3 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                    {t.head}
                  </h3>
                  <div>
                    <p className="font-display text-xl leading-snug text-ink md:text-2xl">
                      “{t.quote}”
                    </p>
                    <p className="mt-5 w-fit rounded-md bg-ink/5 px-3 py-1.5 text-sm text-ink">
                      {t.name}
                    </p>
                    <p className="mt-1.5 w-fit rounded-md bg-ink/5 px-3 py-1.5 text-sm text-ink/70">
                      {t.role}
                    </p>
                  </div>
                </div>
                <div className="min-h-[220px] p-3">
                  <div
                    className="h-full rounded-[1.8rem]"
                    style={{ background: t.g }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <Side o={1} tall />
          <Side o={2} />
        </div>
        <div className="mt-8 flex items-center justify-center gap-2">
          {ITEMS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Testimonial ${k + 1}`}
              className={`relative h-2 overflow-hidden rounded-full bg-ink/15 transition-all duration-500 ${k === i ? "w-24" : "w-2"}`}
            >
              {k === i && (
                <motion.span
                  key={i}
                  className="absolute inset-0 bg-cyan"
                  style={{ transformOrigin: "0 50%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
