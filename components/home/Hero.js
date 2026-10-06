"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Swap /public/hero/*.jpg for the client's real B&W photography
const SLIDES = [
  { word: "IMPACTFUL", sub: "Visual communication", img: "/gallery/1.jpg" },
  { word: "PRECISION", sub: "Engineered output", img: "/gallery/2.jpg" },
  { word: "DURABLE", sub: "Built for the outdoors", img: "/gallery/3.jpg" },
  { word: "ILLUMINATED", sub: "Signage that glows", img: "/gallery/5.jpg" },
];
const CMYK = ["#00AEEF", "#EC008C", "#FFF200", "#14151A"];

// How long the cyan line takes to travel from top to bottom of the image.
// The image's clipPath and the corner chip both use this exact same
// duration/delay/ease, so all three always land in the same place at once.
const PRINT_MS = 4;
const PRINT_DELAY = 0.15;
const PRINT_EASE = [0.16, 1, 0.3, 1];
// Horizontal print-head passes as the chip travels down: right → left → right.
// Add more entries for more passes, e.g. ["100%","0%","100%","0%","100%"].
// const SWEEP = ["100%", "0%", "100%"];
// Number of left↔right passes the chip makes during ONE top → bottom drop.
const SWEEP_PASSES = 2;

// Builds ["0%","100%","0%","100%","0%","100%"]: starts at the left edge and,
// with an odd number of passes, lands in the bottom-right corner.
const SWEEP = Array.from({ length: SWEEP_PASSES + 1 }, (_, k) =>
  k % 2 === 0 ? "0%" : "100%"
);

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 4200);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="font-display text-sm tracking-tight text-ink/60">Corp Prints</p>
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
          <div key={"bar" + i} className="mt-5 flex h-1 w-40 overflow-hidden rounded-full">
            {CMYK.map((c, k) => (
              <motion.span key={c} className="h-full flex-1" style={{ background: c, transformOrigin: "0 50%" }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 + k * 0.12, duration: 0.5 }} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={s.sub} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="mt-5 font-display text-lg uppercase tracking-[0.2em] text-ink/70">
              {s.sub}
            </motion.p>
          </AnimatePresence>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
            Printing, signage and structural fabrication, from concept to installation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03]">Get a quote</a>
            <a href="#services" className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/50">Our services</a>
          </div>
        </div>

        {/* Print reveal: the cyan line travels down, the photo is only ever
            visible up to where the line has passed, and the CMYK chip rides
            down the right edge with it, landing in the corner once it's done. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.img}
              className="absolute inset-0"
              initial={{ clipPath: "inset(0px 0px 100% 0px)" }}
              animate={{ clipPath: "inset(0px 0px 0% 0px)" }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: PRINT_MS, delay: PRINT_DELAY, ease: PRINT_EASE }}
            >
              <img src={s.img} alt={s.sub} className="h-full w-full object-cover " />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={"line" + s.img}
              className="pointer-events-none absolute inset-x-0 h-px bg-cyan shadow-[0_0_12px_#00AEEF]"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: PRINT_MS, delay: PRINT_DELAY, ease: PRINT_EASE }}
            />
          </AnimatePresence>
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={"chip" + s.img}
              className="absolute -right-3 z-10 flex -translate-y-1/2 overflow-hidden rounded-md border-2 border-paper shadow-lg"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: PRINT_MS, delay: PRINT_DELAY, ease: PRINT_EASE }}
            >
              {CMYK.map((c) => <span key={c} className="h-8 w-3 " style={{ background: c }} />)}
            </motion.div>
          </AnimatePresence> */}
          <AnimatePresence mode="wait">
  {/* Wrapper: travels top → bottom in sync with the cyan line and the clipPath.
      right-12 (= the chip's 3rem width) keeps the chip fully inside the image. */}
  <motion.div
    key={"chip" + s.img}
    className="pointer-events-none absolute left-0 right-12 z-10"
    initial={{ top: "0%" }}
    animate={{ top: "100%" }}
    exit={{ opacity: 0, transition: { duration: 0.25 } }}
    transition={{ duration: PRINT_MS, delay: PRINT_DELAY, ease: PRINT_EASE }}
  >
    {/* Chip: sweeps across the width while the wrapper moves down */}
    <motion.div
      className="absolute top-0 flex -translate-y-1/2 overflow-hidden rounded-md border-2 border-paper shadow-lg"
      initial={{ left: SWEEP[0] }}
      animate={{ left: SWEEP }}
      transition={{ duration: PRINT_MS, delay: PRINT_DELAY, ease: "easeInOut" }}
    >
      {CMYK.map((c) => (
        <span key={c} className="h-8 w-3" style={{ background: c }} />
      ))}
    </motion.div>
  </motion.div>
</AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// const FRAMES = [
//   { word: "IMPACTFUL", line: "Visual communication" },
//   { word: "PRECISE", line: "UV & large-format print" },
//   { word: "ILLUMINATED", line: "Signage & display systems" },
//   { word: "STRUCTURAL", line: "Fabrication & installation" },
//   { word: "BRANDED", line: "Corporate rollouts, done right" },
// ];

// const CYCLE_MS = 3600;

// const HERO_CSS = `
// .cp-hero .scan-head{
//   animation: cp-scan var(--cp-cycle) linear infinite;
// }
// @keyframes cp-scan{
//   0%{ left: 0%; opacity: 0; }
//   6%{ opacity: 1; }
//   92%{ opacity: 1; }
//   100%{ left: 100%; opacity: 0; }
// }
// .cp-hero .cp-word{
//   animation: cp-word-in 700ms cubic-bezier(0.16,1,0.3,1) both;
// }
// @keyframes cp-word-in{
//   from{ opacity: 0; transform: translateY(0.4em); clip-path: inset(0 100% 0 0); }
//   to{ opacity: 1; transform: translateY(0); clip-path: inset(0 0% 0 0); }
// }
// .cp-hero .cp-ring{ animation: cp-pulse 2600ms ease-in-out infinite; }
// @keyframes cp-pulse{
//   0%, 100%{ transform: scale(1); opacity: 0.5; }
//   50%{ transform: scale(1.15); opacity: 0.9; }
// }
// .cp-hero .cp-halftone{
//   background-image: radial-gradient(currentColor 1px, transparent 1.4px);
//   background-size: 10px 10px;
// }
// @media (prefers-reduced-motion: reduce){
//   .cp-hero .scan-head, .cp-hero .cp-word, .cp-hero .cp-ring{ animation: none !important; }
// }
// `;

// export default function Hero() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((i) => (i + 1) % FRAMES.length);
//     }, CYCLE_MS);
//     return () => clearInterval(id);
//   }, []);

//   const frame = FRAMES[index];

//   return (
//     <section
//       id="hero"
//       className="cp-hero relative overflow-hidden bg-paper"
//       style={{ "--cp-cycle": `${CYCLE_MS}ms` }}
//     >
//       <style>{HERO_CSS}</style>

//       {/* crop marks, corners of the viewport */}
//       <CropMark className="left-4 top-4 md:left-8 md:top-8" />
//       <CropMark className="right-4 top-4 md:right-8 md:top-8 rotate-90" />
//       <CropMark className="left-4 bottom-4 md:left-8 md:bottom-8 -rotate-90" />
//       <CropMark className="right-4 bottom-4 md:right-8 md:bottom-8 rotate-180" />

//       <div className="mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-8 md:px-10 md:pt-10 lg:px-16">
//         {/* nav */}
       

//         {/* main */}
//         <div className="mt-16 grid grid-cols-1 items-center gap-14 md:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
//           <div>
//             <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/40">
//               Job ticket 001 — visual fabrication
//             </p>

//             {/* scan bar */}
//             <div className="relative my-6 h-px w-full max-w-sm bg-ink/15">
//               <span className="scan-head absolute -top-1.5 flex -translate-x-1/2 items-center gap-[3px]">
//                 <i className="block h-2.5 w-2.5 bg-cyan" />
//                 <i className="block h-2.5 w-2.5 bg-magenta" />
//                 <i className="block h-2.5 w-2.5 bg-yellow" />
//                 <i className="block h-2.5 w-2.5 bg-ink" />
//               </span>
//             </div>

//             <h1 className="font-display text-[15vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
//               <span key={frame.word} className="cp-word block">
//                 {frame.word}
//               </span>
//             </h1>

//             <p
//               key={frame.line}
//               className="cp-word mt-3 font-mono text-sm uppercase tracking-[0.2em] text-ink/50"
//             >
//               {frame.line}
//             </p>

//             <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
//               From a single acrylic sign to a full facade rollout — Corp
//               Prints designs, prints and fabricates the visual assets that
//               carry a brand into the physical world.
//             </p>

//             <div className="mt-9 flex flex-wrap items-center gap-4">
//               <a
//                 href="#contact"
//                 className="rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
//               >
//                 Start a project
//               </a>
//               <a
//                 href="#services"
//                 className="rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
//               >
//                 See what we make
//               </a>
//             </div>
//           </div>

//           {/* swatch / registration panel */}
//           <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-[2rem] border border-ink/10 bg-white lg:justify-self-end">
//             <div className="cp-halftone absolute inset-0 text-ink/[0.06]" />

//             <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
//               <span className="bg-cyan/90" />
//               <span className="bg-magenta/90" />
//               <span className="bg-yellow/90" />
//               <span className="bg-ink" />
//             </div>

//             <div className="absolute inset-6 rounded-[1.4rem] border border-white/40 bg-paper/95 backdrop-blur-sm md:inset-8" />

//             <div className="absolute inset-6 flex flex-col justify-between p-4 md:inset-8 md:p-6">
//               <div className="flex items-center justify-between">
//                 <span className="cp-ring relative flex h-6 w-6 items-center justify-center rounded-full border border-ink/30">
//                   <span className="h-2.5 w-px bg-ink/50" />
//                   <span className="absolute h-px w-2.5 bg-ink/50" />
//                 </span>
//                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
//                   Reg. mark
//                 </span>
//               </div>

//               <div>
//                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
//                   Colour separation
//                 </p>
//                 <div className="mt-3 flex gap-2">
//                   <span className="h-8 flex-1 rounded-md bg-cyan" />
//                   <span className="h-8 flex-1 rounded-md bg-magenta" />
//                   <span className="h-8 flex-1 rounded-md bg-yellow" />
//                   <span className="h-8 flex-1 rounded-md bg-ink" />
//                 </div>
//                 <p className="mt-3 font-mono text-[11px] text-ink/50">
//                   C 100 · M 100 · Y 100 · K 100
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function CropMark({ className = "" }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       className={`pointer-events-none absolute z-10 hidden h-4 w-4 text-ink/25 md:block ${className}`}
//     >
//       <path d="M12 0V9M12 24V15M0 12H9M24 12H15" stroke="currentColor" strokeWidth="1" />
//     </svg>
//   );
// }