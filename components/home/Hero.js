"use client";
import { useEffect, useState } from "react";
import useContent from "@/lib/useContent";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Swap /public/gallery/*.jpg for the client's real photography
const DEFAULT_SLIDES = [
  { word: "IMPACTFUL", sub: "Visual communication", img: "/gallery/1.jpg" },
  { word: "PRECISION", sub: "Engineered output", img: "/gallery/2.jpg" },
  { word: "DURABLE", sub: "Built for the outdoors", img: "/gallery/3.jpg" },
  { word: "ILLUMINATED", sub: "Signage that glows", img: "/gallery/5.jpg" },
];
const CMYK = ["#00AEEF", "#EC008C", "#FFF200", "#14151A"];

/* ───────────── Timing ───────────── */
const SLIDE_MS = 6500; // time between slides (must be longer than FEED_MS + FEED_DELAY)
const FEED_MS = 3.6; // seconds for a sheet to slide fully out
// const FEED_DELAY = 0.15;
// const FEED_EASE = "linear"; // steady feed; try "easeInOut" for a softer start/stop
const FEED_DELAY = 0.5; // wait for the old sheet to mostly vanish before the new one comes out
const FEED_EASE = "linear";
const VANISH_S = 0.7; // how long the old sheet takes to fade out

/* ───────────── Print head ─────────────
   One head riding ONE horizontal line on the printer, back and forth, while
   the sheet feeds out. PASSES = number of left↔right sweeps. */
const PASSES = 4;
const HEAD_L = "20%";
const HEAD_R = "82%";
const SWEEP = Array.from({ length: PASSES + 1 }, (_, k) =>
  k % 2 === 0 ? HEAD_L : HEAD_R,
);

/* ───────────── Geometry (% of the printer photo) ─────────────
   Measured from printer.webp. If you swap the photo, re-measure these. */
const PRINTER_RATIO = "1774 / 665";
const SLOT_TOP = "47%"; // the print line: the paper comes out here, under the head
const SHEET_LEFT = "19.45%"; // media width = where the paper roll starts…
const SHEET_WIDTH = "63.45%"; // …and how wide it is
const SHEET_RATIO = "4 / 3";
// Space reserved under the printer for the part of the sheet that hangs below it:
// (SLOT_TOP + sheet height − printer height) as % of the width. For 4/3 sheets ≈ 27.8%.
const HANG = "27.8%";
const HEAD_TOP = "34.5%"; // head sits on the rail
const HEAD_HEIGHT = "12.5%"; // head + a short beam down to the print line

export default function Hero() {
  const reduce = useReducedMotion();
  const SLIDES = useContent("/api/content/hero", DEFAULT_SLIDES);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => n + 1), SLIDE_MS);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i % SLIDES.length];

  // useEffect(() => {
  //   const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), SLIDE_MS);
  //   return () => clearInterval(t);
  // }, []);
  // const s = SLIDES[i];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2">
        {/* ───────── text ───────── */}
        <div>
          <p className="font-display text-sm tracking-tight text-ink/60">
            Corp Prints
          </p>
          <div className="mt-4 h-[1.1em] overflow-hidden font-display text-[clamp(2.6rem,9vw,6.5rem)] font-bold leading-none tracking-tight text-ink">
            <AnimatePresence mode="wait">
              <motion.h1
                key={s.word}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {s.word}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* CMYK rule: the four inks draw in one after another on each change */}
          <div
            key={"bar" + i}
            className="mt-5 flex h-1 w-40 overflow-hidden rounded-full"
          >
            {CMYK.map((c, k) => (
              <motion.span
                key={c}
                className="h-full flex-1"
                style={{ background: c, transformOrigin: "0 50%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 + k * 0.12, duration: 0.5 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={s.sub}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 font-display text-lg uppercase tracking-[0.2em] text-ink/70"
            >
              {s.sub}
            </motion.p>
          </AnimatePresence>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Printing, signage and structural fabrication, from concept to
            installation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </a>
            <a
              href="#services"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/50"
            >
              Our services
            </a>
          </div>
        </div>

        {/* ───────── printer + output ───────── */}
        {/* paddingBottom reserves room for the sheet hanging below the printer */}
        <div className="relative w-full" style={{ paddingBottom: HANG }}>
          {/* The printer photo (layer 1). mix-blend-multiply drops its white background. */}
          <div
            className="relative z-10 w-full mix-blend-multiply"
            style={{ aspectRatio: PRINTER_RATIO }}
          >
            <img
              src="/hero/printer.webp"
              alt=""
              aria-hidden
              draggable={false}
              className="h-full w-full select-none object-fill"
            />
          </div>

          {/* Output sheet (layer 2, IN FRONT of the printer). This overlay is exactly
              the printer's size, so percentages below are % of the printer photo. */}
          <div
            aria-hidden={false}
            className="pointer-events-none absolute inset-x-0 top-0 z-20"
            style={{ aspectRatio: PRINTER_RATIO }}
          >
            {/* The box's top edge IS the print line: everything above it is clipped,
                so a sheet only shows once it has slid out below it. The clip is open
                at the sides and bottom so an old sheet can keep travelling down. */}
            <div
              className="absolute"
              style={{
                top: SLOT_TOP,
                left: SHEET_LEFT,
                width: SHEET_WIDTH,
                aspectRatio: SHEET_RATIO,
                // clipPath: "inset(0px -30% -70% -30%)",
                clipPath: "inset(0px -30% -20% -30%)",
              }}
            >
              <AnimatePresence>
                <motion.div
                  key={"sheet" + s.img}
                  className="absolute inset-0 overflow-hidden rounded-b-md border border-ink/10 bg-white shadow-[0_14px_30px_-14px_rgba(20,21,26,0.45)]"
                  // New sheet: starts hidden above the print line, slides down over the platen.
                  initial={reduce ? false : { y: "-100%" }}
                  animate={{ y: "0%" }}
                  // Old sheet: pushed on down in lockstep (same duration/ease) and fades out.
                  // exit={
                  //   reduce
                  //     ? { opacity: 0, transition: { duration: 0 } }
                  //     : {
                  //         y: "100%",
                  //         opacity: [1, 1, 0],
                  //         transition: {
                  //           y: {
                  //             duration: FEED_MS,
                  //             delay: FEED_DELAY,
                  //             ease: FEED_EASE,
                  //           },
                  //           opacity: {
                  //             duration: FEED_MS,
                  //             delay: FEED_DELAY,
                  //             times: [0, 0.35, 0.85],
                  //             ease: "linear",
                  //           },
                  //         },
                  //       }
                  // }
                  // Old sheet: drifts back up toward the slot while fading out. The clip hides
// the part that goes above the print line, so it looks pulled back in.
exit={{
  opacity: 0,
  y: "-10%",
  scale: 0.97,
  transition: { duration: reduce ? 0 : VANISH_S, ease: [0.4, 0, 0.2, 1] },
}}
                  transition={{
                    duration: FEED_MS,
                    delay: FEED_DELAY,
                    ease: FEED_EASE,
                  }}
                >
                  <img
                    src={s.img}
                    alt={s.sub}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* shadow where the paper leaves the print zone (fixed at the line) */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-3 bg-gradient-to-b from-ink/40 to-transparent" />
            </div>
          </div>

          {/* Print head (layer 3, on top): a head + short beam sweeping along the rail */}
          {!reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-30"
              style={{ aspectRatio: PRINTER_RATIO }}
            >
              <AnimatePresence>
                <motion.div
                  key={"head" + s.img}
                  className="absolute -ml-[2.1%] w-[4.2%]"
                  style={{ top: HEAD_TOP, height: HEAD_HEIGHT }}
                  initial={{ left: SWEEP[0], opacity: 0 }}
                  animate={{ left: SWEEP, opacity: [0, 1, 1, 0] }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  transition={{
                    left: {
                      duration: FEED_MS,
                      delay: FEED_DELAY,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: FEED_MS,
                      delay: FEED_DELAY,
                      times: [0, 0.04, 0.94, 1],
                      ease: "linear",
                    },
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden rounded-[3px] bg-ink shadow-lg ring-1 ring-white/50">
                    <div className="absolute inset-x-0 bottom-0 flex h-1/3">
                      {CMYK.map((c) => (
                        <i
                          key={c}
                          className="flex-1"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 top-[60%] w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan to-magenta shadow-[0_0_10px_2px_rgba(0,174,239,0.55)]" />
                  <div className="absolute bottom-0 left-1/2 h-2 w-[180%] -translate-x-1/2 rounded-full bg-cyan/40 blur-md" />
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
