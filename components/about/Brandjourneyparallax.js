
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Draft copy built from the company overview. Replace with your real story.
// Put your photos in /public/journey/1.jpg … 5.jpg
const CHAPTERS = [
  {
    kicker: "Vision",
    title: "Visual communication, end to end.",
    text: "Corp Prints is a visual branding and structural fabrication firm. We take an idea from the first sketch to a finished piece in the real world.",
    tags: ["Branding", "Printing", "Fabrication"],
    img: "/gallery/1.jpg",
    dot: "bg-cyan",
  },
  {
    kicker: "Print",
    title: "High-resolution, built to last.",
    text: "From flex and vinyl to UV printing with white ink on acrylic, glass, ACP and more, every surface becomes a canvas for your brand.",
    tags: ["UV White Ink", "Flex", "Vinyl"],
    img: "/gallery/2.jpg",
    dot: "bg-magenta",
  },
  {
    kicker: "Fabricate",
    title: "Where design meets the machine.",
    text: "Laser and CNC cutting turn drawings into precise signage, interior panels, engravings and custom brand elements.",
    tags: ["Laser Cutting", "CNC Routing", "Engraving"],
    img: "/gallery/3.jpg",
    dot: "bg-yellow",
  },
  {
    kicker: "Illuminate",
    title: "Signage that glows.",
    text: "LED-lit and edge-glow acrylic boards, liquid acrylic fabrication and facade lighting give a brand presence that works day and night.",
    tags: ["LED Signage", "Acrylic", "Facade Lighting"],
    img: "/gallery/4.jpg",
    dot: "bg-ink",
  },
  {
    kicker: "Install",
    title: "From concept to installation.",
    text: "Our mission is to bridge creative design with advanced fabrication technology, delivering durable, high-impact visual communication for corporate, retail and event clients.",
    tags: ["Hoardings", "Fleet Wrapping", "Structures"],
    img: "/gallery/5.jpg",
    dot: "bg-cyan",
  },
];

const N = CHAPTERS.length;
const ANIM_MS = 1000;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const pad = (n) => String(n).padStart(2, "0");

const GRID = {
  backgroundImage:
    "linear-gradient(rgba(20,21,26,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,26,.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};
const HALFTONE = {
  backgroundImage: "radial-gradient(rgba(20,21,26,.35) 1px, transparent 1.4px)",
  backgroundSize: "6px 6px",
};

function Corner({ className }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-5 w-5 border-ink/60 ${className}`}
    />
  );
}

export default function BrandJourney() {
  const [page, setPage] = useState(0);
  const boxRef = useRef(null); // tall wrapper: its height is the scroll distance
  const stageRef = useRef(null); // sticky 100svh stage

  // Chapter is derived from how far the page has scrolled through the wrapper
  useEffect(() => {
    let raf = 0;

    const measure = () => {
      const box = boxRef.current;
      const stage = stageRef.current;
      if (!box || !stage) return;
      const top = box.getBoundingClientRect().top;
      const scrollable = box.offsetHeight - stage.offsetHeight;
      if (scrollable <= 0) return;
      const step = scrollable / N;
      const scrolled = Math.min(Math.max(-top, 0), scrollable - 1);
      const next = Math.min(N - 1, Math.max(0, Math.floor(scrolled / step)));
      setPage((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Progress bars: scroll the page to that chapter's slot
  const goTo = useCallback((i) => {
    const box = boxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;
    const step = (box.offsetHeight - stage.offsetHeight) / N;
    const y = window.scrollY + box.getBoundingClientRect().top + i * step + 2;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <section
      id="journey"
      ref={boxRef}
      className="relative w-full"
      // one extra screen so the last chapter also gets a full "hold"
      style={{ height: `${(N + 1) * 100}svh` }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-paper font-body text-ink"
      >
        {CHAPTERS.map((c, i) => {
          const rel = i - page; // 0 = active, <0 = already seen, >0 = upcoming
          const active = rel === 0;
          // Text slab always travels UP, image slab always travels DOWN
          const leftY = active ? "0%" : rel < 0 ? "-100%" : "100%";
          const rightY = active ? "0%" : rel < 0 ? "100%" : "-100%";

          return (
            <div key={c.kicker} className="absolute inset-0" aria-hidden={!active}>
              {/* LEFT: story text */}
              <div
                className="absolute left-0 top-0 h-1/2 w-full bg-paper will-change-transform motion-reduce:transition-none lg:h-full lg:w-1/2"
                style={{
                  // ...GRID,
                  transform: `translateY(${leftY})`,
                  transition: `transform ${ANIM_MS}ms ${EASE}`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 right-4 select-none font-display font-bold leading-none text-transparent lg:-bottom-8 lg:right-10"
                  style={{
                    fontSize: "clamp(5rem, 16vw, 13rem)",
                    WebkitTextStroke: "1px rgba(20,21,26,.14)",
                  }}
                >
                  {pad(i + 1)}
                </span>

                <div className="relative flex h-full flex-col justify-center px-6 pb-14 pt-6 lg:px-16 lg:pb-0 lg:pt-0">
                  <div className="max-w-xl">
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 lg:text-xs">
                      <span className={`size-2 rounded-full ${c.dot}`} />
                      Chapter {pad(i + 1)} · {c.kicker}
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(1.6rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-tight lg:mt-5">
                      {c.title}
                    </h2>
                    <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-ink/70 lg:mt-6 lg:line-clamp-none lg:text-base">
                      {c.text}
                    </p>
                    <ul className="mt-4 hidden flex-wrap gap-2 sm:flex lg:mt-8">
                      {c.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-ink/15 bg-white/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT: image */}
              <div
                className="absolute left-0 top-1/2 h-1/2 w-full bg-paper p-3 will-change-transform motion-reduce:transition-none lg:left-1/2 lg:top-0 lg:h-full lg:w-1/2 lg:p-10"
                style={{
                  transform: `translateY(${rightY})`,
                  transition: `transform ${ANIM_MS}ms ${EASE} 60ms`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 lg:rounded-[2.5rem]">
                  <img
                    src={c.img}
                    alt={c.kicker}
                    className="h-full w-full object-cover"
                    style={{
                      transform: active ? "scale(1)" : "scale(1.15)",
                      transition: `transform 1600ms ${EASE}`,
                    }}
                  />

                  {/* CMYK tint + halftone */}
                  <div className="absolute inset-0 bg-cyan/15 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-magenta/15 via-transparent to-yellow/20 mix-blend-multiply" />
                  {/* <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={HALFTONE} /> */}

                  {/* {active && (
                    <motion.span
                      className="pointer-events-none absolute inset-x-0 h-px bg-cyan shadow-[0_0_14px_#00B8D9]"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
                    />
                  )} */}

                  {/* <Corner className="left-3 top-3 border-l-2 border-t-2" />
                  <Corner className="right-3 top-3 border-r-2 border-t-2" />
                  <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
                  <Corner className="bottom-3 right-3 border-b-2 border-r-2" /> */}

                  <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-md border border-white/60 bg-paper/85 px-2.5 py-1.5 backdrop-blur">
                    <span className="font-mono text-[10px] uppercase tracking-widest">
                      Fig. {pad(i + 1)}
                    </span>
                    <span className="flex overflow-hidden rounded-sm">
                      <i className="h-3 w-2 bg-cyan" />
                      <i className="h-3 w-2 bg-magenta" />
                      <i className="h-3 w-2 bg-yellow" />
                      <i className="h-3 w-2 bg-ink" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* HUD: counter + progress rail */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 rounded-full border border-ink/10 bg-paper/85 px-4 py-2 backdrop-blur lg:bottom-8 lg:left-16">
          <span className="font-mono text-xs tabular-nums">
            {pad(page + 1)} <span className="text-ink/40">/ {pad(N)}</span>
          </span>
          <div className="flex items-center gap-1.5">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.kicker}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to chapter ${i + 1}: ${c.kicker}`}
                className="group py-2"
              >
                <span
                  className={`block h-1 rounded-full transition-all duration-500 ${
                    i === page ? `w-8 ${c.dot}` : "w-3 bg-ink/20 group-hover:bg-ink/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/40 sm:block">
            Scroll
          </span>
        </div>

        {/* seam line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px bg-ink/10 lg:inset-x-auto lg:inset-y-0 lg:left-1/2 lg:h-auto lg:w-px"
        />
      </div>
    </section>
  );
}