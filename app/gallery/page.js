// "use client";
// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   animate,
//   useMotionValue,
// } from "motion/react";

// /* ───────────────────────── Data ─────────────────────────
//    Put real project photos at /public/gallery/1.jpg … 8.jpg.
//    If an image is missing, the tile shows a CMYK gradient instead of a broken icon.
//    Titles/descriptions are drafts, so edit them. `span` controls the bento size
//    (md and up), and the 8 tiles below tile the 2-row grid with no gaps. */

// const mesh = (a, b, c) =>
//   `radial-gradient(60% 50% at 15% 10%, ${a}, transparent 70%), radial-gradient(55% 50% at 90% 30%, ${b}, transparent 70%), radial-gradient(60% 55% at 40% 100%, ${c}, transparent 70%), #fff`;
// const C = "rgba(0,184,217,.45)";
// const M = "rgba(232,54,143,.35)";
// const Y = "rgba(255,196,0,.5)";
// const MESHES = [mesh(C, Y, M), mesh(M, C, Y), mesh(Y, M, C), mesh(C, M, Y)];

// const ITEMS = [
//   { title: "Flex & Vinyl", tag: "Printing", desc: "Large-format banners, hoardings and wall graphics.", img: "/gallery/1.jpg", span: "md:col-span-2 md:row-span-2" },
//   { title: "UV & White Ink", tag: "Printing", desc: "Crisp prints on acrylic, glass, ACP and fabric.", img: "/gallery/2.jpg", span: "" },
//   { title: "Glow Signage", tag: "Signage", desc: "LED-lit and edge-glow acrylic sign boards.", img: "/gallery/3.jpg", span: "" },
//   { title: "Laser & CNC", tag: "Fabrication", desc: "Precision cutting, carving and engraving.", img: "/gallery/4.jpg", span: "md:row-span-2" },
//   { title: "Fleet Wraps", tag: "Branding", desc: "Canter van displays and full vehicle graphics.", img: "/gallery/5.jpg", span: "" },
//   { title: "Window Concepts", tag: "Display", desc: "Visual merchandising for retail and malls.", img: "/gallery/6.jpg", span: "" },
//   { title: "Facade Branding", tag: "Branding", desc: "Aluminum frames, facades and structural hoardings.", img: "/gallery/7.jpg", span: "md:col-span-2 md:row-span-2" },
//   { title: "Installations", tag: "Install", desc: "Arches, lighting works and on-site fitting.", img: "/gallery/8.jpg", span: "md:row-span-2" },
// ].map((it, i) => ({ ...it, id: i, bg: MESHES[i % 4] }));

// const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];
// const pad = (n) => String(n).padStart(2, "0");

// const BLUEPRINT = {
//   backgroundImage:
//     "linear-gradient(rgba(20,21,26,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,26,.05) 1px, transparent 1px)",
//   backgroundSize: "40px 40px",
//   WebkitMaskImage: "linear-gradient(to bottom, #000 40%, transparent)",
//   maskImage: "linear-gradient(to bottom, #000 40%, transparent)",
// };

// const hideBroken = (e) => {
//   e.currentTarget.style.display = "none";
// };

// /* ───────────────────────── Animation variants ───────────────────────── */

// const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
// const itemVariants = {
//   hidden: { opacity: 0, y: 24, scale: 0.96 },
//   visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 16 } },
// };

// /* ───────────────────────── Lightbox ───────────────────────── */

// function Lightbox({ index, onClose, onNav }) {
//   const item = ITEMS[index];

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//       else if (e.key === "ArrowRight") onNav(1);
//       else if (e.key === "ArrowLeft") onNav(-1);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose, onNav]);

//   const navBtn =
//     "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper";

//   return (
//     <motion.div
//       className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" onClick={onClose} />

//       <motion.div
//         role="dialog"
//         aria-modal="true"
//         aria-label={item.title}
//         className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-2xl"
//         initial={{ scale: 0.94, y: 24, opacity: 0 }}
//         animate={{ scale: 1, y: 0, opacity: 1 }}
//         exit={{ scale: 0.94, y: 24, opacity: 0 }}
//         transition={{ type: "spring", stiffness: 260, damping: 26 }}
//       >
//         <div aria-hidden className="flex h-1.5">
//           <span className="flex-1 bg-cyan" />
//           <span className="flex-1 bg-magenta" />
//           <span className="flex-1 bg-yellow" />
//           <span className="flex-1 bg-ink" />
//         </div>

//         <div
//           className="relative flex min-h-[16rem] items-center justify-center"
//           style={{ background: item.bg }}
//         >
//           <img
//             key={item.id}
//             src={item.img}
//             alt={item.title}
//             onError={hideBroken}
//             className="max-h-[62svh] w-full object-contain"
//           />

//           <button type="button" onClick={() => onNav(-1)} aria-label="Previous image" className={`${navBtn} left-3`}>
//             <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
//           </button>
//           <button type="button" onClick={() => onNav(1)} aria-label="Next image" className={`${navBtn} right-3`}>
//             <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close image view"
//             className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper"
//           >
//             <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
//           </button>
//         </div>

//         <div className="p-5 sm:p-6">
//           <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
//             <span className={`h-2 w-2 rounded-full ${DOTS[index % 4]}`} />
//             Fig. {pad(index + 1)} / {pad(ITEMS.length)} · {item.tag}
//           </p>
//           <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">{item.title}</h3>
//           <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink/70">{item.desc}</p>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* ───────────────────────── Gallery ───────────────────────── */

// export default function AboutGallery() {
//   const [selected, setSelected] = useState(null);
//   const [limit, setLimit] = useState(0); // most negative x the track may reach
//   const viewportRef = useRef(null);
//   const trackRef = useRef(null);
//   const x = useMotionValue(0);
//   const progress = useMotionValue(0);

//   // how far the strip can be dragged
//   useEffect(() => {
//     const measure = () => {
//       if (!viewportRef.current || !trackRef.current) return;
//       const next = Math.min(0, viewportRef.current.offsetWidth - trackRef.current.offsetWidth);
//       setLimit(next);
//       if (x.get() < next) x.set(next);
//     };
//     measure();
//     const ro = new ResizeObserver(measure);
//     ro.observe(viewportRef.current);
//     ro.observe(trackRef.current);
//     return () => ro.disconnect();
//   }, [x]);

//   // drive the progress bar from the drag position
//   useEffect(() => {
//     const update = (v) => progress.set(limit < 0 ? Math.min(1, Math.max(0, v / limit)) : 0);
//     update(x.get());
//     return x.on("change", update);
//   }, [x, progress, limit]);

//   const step = (dir) => {
//     const target = Math.max(limit, Math.min(0, x.get() - dir * 340));
//     animate(x, target, { type: "spring", stiffness: 140, damping: 24 });
//   };

//   // lock page scroll while the lightbox is open
//   useEffect(() => {
//     document.body.style.overflow = selected !== null ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [selected]);

//   const nav = useCallback((dir) => {
//     setSelected((s) => (s === null ? s : (s + dir + ITEMS.length) % ITEMS.length));
//   }, []);
//   const close = useCallback(() => setSelected(null), []);

//   return (
//     <section className="relative w-full overflow-hidden bg-paper py-16 text-ink sm:py-24">
//       {/* blueprint grid */}
//       <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]" style={BLUEPRINT} />

//       {/* heading */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.4 }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         className="relative mx-auto max-w-3xl px-6 text-center"
//       >
//         <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
//           Corp Prints <span className="text-ink/30">/</span> Gallery
//         </p>
//         <h2 className="mt-4 font-display text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight">
//           Our Work
//         </h2>
//         <div className="mx-auto mt-6 flex h-1 w-40 overflow-hidden rounded-full">
//           {DOTS.map((c) => (
//             <span key={c} className={`h-full flex-1 ${c}`} />
//           ))}
//         </div>
//         <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
//           Prints, signage and fabrication from our recent projects. Drag to explore, click to expand.
//         </p>
//       </motion.div>

//       {/* draggable bento strip */}
//       <div ref={viewportRef} className="relative mt-12 w-full cursor-grab select-none active:cursor-grabbing">
//         <motion.div
//           ref={trackRef}
//           className="w-max px-6 md:px-10"
//           style={{ x }}
//           drag="x"
//           dragConstraints={{ left: limit, right: 0 }}
//           dragElastic={0.06}
//         >
//           <motion.div
//             className="grid grid-flow-col auto-cols-[15rem] grid-rows-[repeat(2,12.5rem)] gap-3 sm:auto-cols-[16rem] sm:gap-4 md:grid-rows-[repeat(2,15rem)]"
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.15 }}
//           >
//             {ITEMS.map((item, i) => (
//               <motion.div
//                 key={item.id}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//                 onTap={() => setSelected(i)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     e.preventDefault();
//                     setSelected(i);
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`View ${item.title}`}
//                 style={{ background: item.bg }}
//                 className={`group relative overflow-hidden rounded-2xl border border-ink/10 shadow-sm outline-none transition-shadow duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${item.span}`}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   draggable={false}
//                   onError={hideBroken}
//                   className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />

//                 {/* CMYK tint, fades on hover so the photo shows true colour */}
//                 <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/15 via-transparent to-magenta/15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />

//                 {/* tag chip */}
//                 <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/60 bg-paper/90 px-3 py-1.5 backdrop-blur">
//                   <span className={`h-1.5 w-1.5 rounded-full ${DOTS[i % 4]}`} />
//                   <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
//                     {pad(i + 1)} · {item.tag}
//                   </span>
//                 </div>

//                 {/* hover details (always visible on touch screens) */}
//                 <div
//                   aria-hidden
//                   className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
//                 />
//                 <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
//                   <h3 className="font-display text-lg font-bold leading-tight text-paper">{item.title}</h3>
//                   <p className="mt-1 line-clamp-2 text-sm text-paper/80">{item.desc}</p>
//                 </div>

//                 {/* CMYK underline sweeps in on hover */}
//                 <span
//                   aria-hidden
//                   className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${DOTS[i % 4]}`}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* progress + arrows */}
//       <div className="relative mx-auto mt-8 flex max-w-7xl items-center gap-6 px-6 md:px-10">
//         <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
//           <motion.div
//             className="h-full origin-left rounded-full bg-gradient-to-r from-cyan via-magenta to-yellow"
//             style={{ scaleX: progress }}
//           />
//         </div>
//         <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 sm:block">
//           Drag ← →
//         </p>
//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => step(-1)}
//             aria-label="Scroll left"
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
//           >
//             <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
//           </button>
//           <button
//             type="button"
//             onClick={() => step(1)}
//             aria-label="Scroll right"
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
//           >
//             <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
//           </button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {selected !== null && <Lightbox index={selected} onClose={close} onNav={nav} />}
//       </AnimatePresence>
//     </section>
//   );
// }
"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* ───────────────────────── Data ─────────────────────────
   Put real project photos at /public/gallery/1.jpg … 8.jpg.
   Missing images fall back to a CMYK gradient. Titles/descriptions are drafts.
   `span` controls the bento size (md and up). The 8 tiles below tile the
   2-row grid with no gaps. */

const mesh = (a, b, c) =>
  `radial-gradient(60% 50% at 15% 10%, ${a}, transparent 70%), radial-gradient(55% 50% at 90% 30%, ${b}, transparent 70%), radial-gradient(60% 55% at 40% 100%, ${c}, transparent 70%), #fff`;
const C = "rgba(0,184,217,.45)";
const M = "rgba(232,54,143,.35)";
const Y = "rgba(255,196,0,.5)";
const MESHES = [mesh(C, Y, M), mesh(M, C, Y), mesh(Y, M, C), mesh(C, M, Y)];

const ITEMS = [
  { title: "Flex & Vinyl", tag: "Printing", desc: "Large-format banners, hoardings and wall graphics.", img: "/gallery/1.jpg", span: "md:col-span-2 md:row-span-2" },
  { title: "UV & White Ink", tag: "Printing", desc: "Crisp prints on acrylic, glass, ACP and fabric.", img: "/gallery/2.jpg", span: "" },
  { title: "Glow Signage", tag: "Signage", desc: "LED-lit and edge-glow acrylic sign boards.", img: "/gallery/3.jpg", span: "" },
  { title: "Laser & CNC", tag: "Fabrication", desc: "Precision cutting, carving and engraving.", img: "/gallery/4.jpg", span: "md:row-span-2" },
  { title: "Fleet Wraps", tag: "Branding", desc: "Canter van displays and full vehicle graphics.", img: "/gallery/5.jpg", span: "" },
  { title: "Window Concepts", tag: "Display", desc: "Visual merchandising for retail and malls.", img: "/gallery/6.jpg", span: "" },
  { title: "Facade Branding", tag: "Branding", desc: "Aluminum frames, facades and structural hoardings.", img: "/gallery/7.jpg", span: "md:col-span-2 md:row-span-2" },
  { title: "Installations", tag: "Install", desc: "Arches, lighting works and on-site fitting.", img: "/gallery/8.jpg", span: "md:row-span-2" },
].map((it, i) => ({ ...it, id: i, bg: MESHES[i % 4] }));

// How much page scroll one pixel of sideways travel costs.
// 1 = natural feel, 1.5 = slower/longer, 0.7 = quicker/shorter.
const SCROLL_FACTOR = 1;

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

/* ───────────────────────── Animation variants ───────────────────────── */

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 16 } },
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
  const [distance, setDistance] = useState(0); // how far the strip must travel sideways
  const [mounted, setMounted] = useState(false);

  const outerRef = useRef(null); // tall wrapper: its height = scroll length
  const stageRef = useRef(null); // sticky full-screen stage
  const trackRef = useRef(null); // the strip
  const dist = useMotionValue(0);

  // 0 → 1 while the wrapper scrolls through the pinned range
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform([progress, dist], ([p, d]) => -p * d);

  useEffect(() => setMounted(true), []);

  // measure how far the strip overflows the screen
  useEffect(() => {
    const measure = () => {
      if (!stageRef.current || !trackRef.current) return;
      const d = Math.max(0, trackRef.current.offsetWidth - stageRef.current.offsetWidth);
      dist.set(d);
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stageRef.current);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [dist]);

  // arrows scroll the page, which slides the strip
  const step = (dir) =>
    window.scrollBy({ top: dir * Math.max(240, distance / 3), behavior: "smooth" });

  // keyboard focus on an off-screen tile: scroll the page so the tile slides in
  const revealTile = (el) => {
    if (!trackRef.current || !outerRef.current || distance <= 0) return;
    const left = el.getBoundingClientRect().left - trackRef.current.getBoundingClientRect().left;
    const p = Math.min(1, Math.max(0, (left - 40) / distance));
    const top = outerRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * distance * SCROLL_FACTOR });
  };

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
    <section
      ref={outerRef}
      className="relative w-full"
      style={{ height: `calc(100svh + ${distance * SCROLL_FACTOR}px)` }}
    >
      <div
        ref={stageRef}
        // stops the browser from sideways-scrolling the clipped stage on focus
        onScroll={(e) => {
          e.currentTarget.scrollLeft = 0;
        }}
        className="sticky top-0 flex h-[100svh] w-full flex-col justify-center overflow-hidden bg-paper pb-6 pt-20 text-ink md:pt-24"
      >
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
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
            Corp Prints <span className="text-ink/30">/</span> Gallery
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,7vw,4.75rem)] font-bold leading-[0.95] tracking-tight">
            Our Work
          </h2>
          <div className="mx-auto mt-4 flex h-1 w-32 overflow-hidden rounded-full">
            {DOTS.map((c) => (
              <span key={c} className={`h-full flex-1 ${c}`} />
            ))}
          </div>
          <p className="mx-auto mt-4 hidden max-w-xl text-base leading-relaxed text-ink/70 md:block">
            Prints, signage and fabrication from our recent projects. Scroll to explore, click to expand.
          </p>
        </motion.div>

        {/* strip: slides sideways as the page scrolls */}
        <div className="relative mt-6 w-full select-none md:mt-8">
          <motion.div ref={trackRef} className="w-max px-6 md:px-10" style={{ x }}>
            <motion.div
              className="grid grid-flow-col auto-cols-[14rem] grid-rows-[repeat(2,clamp(8rem,27svh,15rem))] gap-3 sm:auto-cols-[16rem] sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelected(i)}
                  onFocus={(e) => revealTile(e.currentTarget)}
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
                    <h3 className="font-display text-lg font-bold leading-tight text-paper">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-paper/80">{item.desc}</p>
                  </div>

                  {/* CMYK underline sweeps in on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${DOTS[i % 4]}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* progress + arrows */}
        <div className="relative mx-auto mt-6 flex w-full max-w-7xl items-center gap-6 px-6 md:mt-8 md:px-10">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-cyan via-magenta to-yellow"
              style={{ scaleX: progress }}
            />
          </div>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 sm:block">
            Scroll ↓
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Scroll back"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Scroll forward"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
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