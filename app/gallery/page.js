"use client";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

/* ───────────────────────── Data ─────────────────────────
   Put real project photos at /public/gallery/*.jpg.
   Missing images fall back to a CMYK gradient. Titles/descriptions are drafts.

   `span` sets the bento size. On tablet/desktop (md and up) the grid has 4
   columns, and these 8 tiles fill a 4 × 4 block with no gaps:
   2×2, 1×1, 1×2, 1×1, 1×2, 2×2, 1×1, 1×1.
   On phones the grid has 2 columns: the first and last tiles are full width. */

const mesh = (a, b, c) =>
  `radial-gradient(60% 50% at 15% 10%, ${a}, transparent 70%), radial-gradient(55% 50% at 90% 30%, ${b}, transparent 70%), radial-gradient(60% 55% at 40% 100%, ${c}, transparent 70%), #fff`;
const C = "rgba(0,184,217,.45)";
const M = "rgba(232,54,143,.35)";
const Y = "rgba(255,196,0,.5)";
const MESHES = [mesh(C, Y, M), mesh(M, C, Y), mesh(Y, M, C), mesh(C, M, Y)];

const ITEMS = [
  { title: "Flex & Vinyl", tag: "Printing", desc: "Large-format banners, hoardings and wall graphics.", img: "/gallery/1.jpg", span: "col-span-2 md:col-span-2 md:row-span-2" },
  { title: "UV & White Ink", tag: "Printing", desc: "Crisp prints on acrylic, glass, ACP and fabric.", img: "/gallery/2.jpg", span: "" },
  { title: "Glow Signage", tag: "Signage", desc: "LED-lit and edge-glow acrylic sign boards.", img: "/gallery/3.jpg", span: "md:row-span-2" },
  { title: "Laser & CNC", tag: "Fabrication", desc: "Precision cutting, carving and engraving.", img: "/gallery/4.jpg", span: "" },
  { title: "Window Concepts", tag: "Display", desc: "Visual merchandising for retail and malls.", img: "/gallery/1.jpg", span: "md:row-span-2" },
  { title: "Facade Branding", tag: "Branding", desc: "Aluminum frames, facades and structural hoardings.", img: "/gallery/2.jpg", span: "md:col-span-2 md:row-span-2" },
  { title: "Fleet Wraps", tag: "Branding", desc: "Canter van displays and full vehicle graphics.", img: "/gallery/5.jpg", span: "" },
  { title: "Installations", tag: "Install", desc: "Arches, lighting works and on-site fitting.", img: "/gallery/3.jpg", span: "col-span-2 md:col-span-1" },
].map((it, i) => ({ ...it, id: i, bg: MESHES[i % 4] }));

const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];
const pad = (n) => String(n).padStart(2, "0");

const BLUEPRINT = {
  backgroundImage:
    "linear-gradient(rgba(20,21,26,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,26,.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent)",
  maskImage: "linear-gradient(to bottom, #000 40%, transparent)",
};

const hideBroken = (e) => {
  e.currentTarget.style.display = "none";
};

/* ───────────────────────── Animation ───────────────────────── */

// Each tile fades up as it scrolls into view, with a small stagger per column
const tileVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16, delay: (i % 4) * 0.07 },
  }),
};

/* ───────────────────────── Lightbox ───────────────────────── */

function Lightbox({ index, onClose, onNav }) {
  const item = ITEMS[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav(1);
      else if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  const navBtn =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper";

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-2xl"
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div aria-hidden className="flex h-1.5">
          <span className="flex-1 bg-cyan" />
          <span className="flex-1 bg-magenta" />
          <span className="flex-1 bg-yellow" />
          <span className="flex-1 bg-ink" />
        </div>

        <div className="relative flex min-h-[16rem] items-center justify-center" style={{ background: item.bg }}>
          <img
            key={item.id}
            src={item.img}
            alt={item.title}
            onError={hideBroken}
            className="max-h-[62svh] w-full object-contain"
          />

          <button type="button" onClick={() => onNav(-1)} aria-label="Previous image" className={`${navBtn} left-3`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => onNav(1)} aria-label="Next image" className={`${navBtn} right-3`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image view"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
            <span className={`h-2 w-2 rounded-full ${DOTS[index % 4]}`} />
            Fig. {pad(index + 1)} / {pad(ITEMS.length)} · {item.tag}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{item.title}</h3>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/70">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */

export default function AboutGallery() {
  const [selected, setSelected] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock page scroll while the lightbox is open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const nav = useCallback((dir) => {
    setSelected((s) => (s === null ? s : (s + dir + ITEMS.length) % ITEMS.length));
  }, []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section className="relative w-full overflow-x-clip bg-paper pb-20 pt-32 text-ink md:pb-28 md:pt-40">
      {/* blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]" style={BLUEPRINT} />

      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="font-display text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight">
          Our Work
        </h2>
        <div className="mx-auto mt-5 flex h-1 w-40 overflow-hidden rounded-full">
          {DOTS.map((c) => (
            <span key={c} className={`h-full flex-1 ${c}`} />
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
          Prints, signage and fabrication from our recent projects. Click any image to expand.
        </p>
      </motion.div>

      {/* vertical bento grid */}
      <div className="relative mx-auto mt-12 max-w-7xl px-6 md:mt-16 md:px-10">
        <div className="grid grid-cols-2 auto-rows-[11rem] gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-4 md:auto-rows-[14rem] lg:auto-rows-[16rem]">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={tileVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
              style={{ background: item.bg }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-ink/10 shadow-sm outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${item.span}`}
            >
              <img
                src={item.img}
                alt={item.title}
                draggable={false}
                onError={hideBroken}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* CMYK tint, fades on hover so the photo shows true colour */}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/15 via-transparent to-magenta/15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />

              {/* tag chip */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/60 bg-paper/90 px-3 py-1.5 backdrop-blur">
                <span className={`h-1.5 w-1.5 rounded-full ${DOTS[i % 4]}`} />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
                  {pad(i + 1)} · {item.tag}
                </span>
              </div>

              {/* hover details (always visible on touch screens) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                <h3 className="font-display text-base font-bold leading-tight text-paper sm:text-lg">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-paper/80 sm:text-sm">{item.desc}</p>
              </div>

              {/* CMYK underline sweeps in on hover */}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${DOTS[i % 4]}`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* portal keeps the lightbox above the fixed navbar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected !== null && <Lightbox index={selected} onClose={close} onNav={nav} />}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}