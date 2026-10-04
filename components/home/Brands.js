// // "use client";
// // import { motion } from "motion/react";
// // import Reveal from "./Reveal";

// // // Replace with real client names / drop <img> logos in here
// // const BRANDS = [
// //   "Brand One",
// //   "Brand Two",
// //   "Brand Three",
// //   "Brand Four",
// //   "Brand Five",
// //   "Brand Six",
// //   "Brand Seven",
// //   "Brand Eight",
// // ];
// // const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow"];

// // export default function Brands() {
// //   const row = [...BRANDS, ...BRANDS];
// //   return (
// //     <section className="py-20">
// //       <Reveal className="mx-auto max-w-6xl px-6">
// //         <h2 className="font-display text-2xl tracking-tight text-ink md:text-4xl">
// //           Trusted by brands that need to be seen.
// //         </h2>
// //       </Reveal>
// //       <div className="mt-10 overflow-hidden border-y border-ink/10 bg-white/50 py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
// //         <motion.div
// //           className="flex w-max gap-14"
// //           animate={{ x: ["0%", "-50%"] }}
// //           transition={{ duration: 30, ease: "linear", repeat: Infinity }}
// //         >
// //           {row.map((b, i) => (
// //             <span
// //               key={i}
// //               className="flex items-center gap-3 font-display text-xl text-ink/50"
// //             >
// //               <i
// //                 className={`h-2.5 w-2.5 rounded-full ${DOTS[i % 3]} mix-blend-multiply`}
// //               />
// //               {b}
// //             </span>
// //           ))}
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// "use client";
// import { useId } from "react";
// import { motion, useReducedMotion } from "motion/react";
// import Reveal from "./Reveal";

// // Replace with real client names / drop <img> logos in here
// const BRANDS = [
//   "Brand One",
//   "Brand Two",
//   "Brand Three",
//   "Brand Four",
//   "Brand Five",
//   "Brand Six",
//   "Brand Seven",
//   "Brand Eight",
// ];
// const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow"];

// // Top-down printer. The output slot is at x 258–298, vertically centred (y 70),
// // so a strip centred on the printer lines up with it automatically.
// function Printer({ className = "" }) {
//   const uid = useId().replace(/:/g, "");
//   return (
//     <svg
//       viewBox="0 0 300 140"
//       className={className}
//       aria-hidden
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#2A2C35" />
//           <stop offset="1" stopColor="#14151A" />
//         </linearGradient>
//         <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0" stopColor="#3A3D48" />
//           <stop offset="0.5" stopColor="#1B1D24" />
//           <stop offset="1" stopColor="#2A2C35" />
//         </linearGradient>
//       </defs>

//       {/* body */}
//       <rect x="0" y="6" width="298" height="128" rx="18" fill={`url(#body-${uid})`} />

//       {/* scanner lid + gloss */}
//       <rect x="16" y="20" width="184" height="100" rx="10" fill={`url(#glass-${uid})`} stroke="#000" strokeOpacity=".35" />
//       <path d="M26 30H122L62 110H26Z" fill="#fff" fillOpacity=".05" />

//       {/* control panel */}
//       <rect x="210" y="26" width="42" height="88" rx="8" fill="#0F1014" />
//       <rect x="216" y="32" width="30" height="16" rx="3" className="fill-cyan" fillOpacity=".3" />
//       <circle cx="222" cy="62" r="4" className="fill-cyan animate-pulse" />
//       <circle cx="240" cy="62" r="4" className="fill-magenta" />
//       <circle cx="222" cy="76" r="4" className="fill-yellow" />
//       <circle cx="240" cy="76" r="4" fill="#6B6E7A" />
//       <circle cx="231" cy="100" r="7" stroke="#fff" strokeOpacity=".3" />
//       <path d="M231 96V100" stroke="#fff" strokeOpacity=".5" strokeLinecap="round" />

//       {/* output slot */}
//       <rect x="258" y="26" width="40" height="88" rx="6" fill="#07080B" />
//       <rect x="258.5" y="26.5" width="39" height="87" rx="5.5" stroke="#fff" strokeOpacity=".08" />
//     </svg>
//   );
// }

// export default function Brands() {
//   const reduce = useReducedMotion();
//   const row = [...BRANDS, ...BRANDS];

//   return (
//     <section className="py-20">
//       <Reveal className="mx-auto max-w-6xl px-6">
//         <h2 className="font-display text-2xl tracking-tight text-ink md:text-4xl">
//           Trusted by brands that need to be seen.
//         </h2>
//       </Reveal>

//       {/* --h = printer height; everything else is sized from it so it scales together */}
//       <div
//         className="mt-12 flex items-center overflow-hidden"
//         style={{ "--h": "clamp(96px, 22vw, 160px)" }}
//       >
//         <Printer className="relative z-10 -ml-[calc(var(--h)*0.15)] aspect-[300/140] h-[var(--h)] w-auto shrink-0 drop-shadow-xl" />

//         {/* Paper strip: starts inside the slot (over the printer) and runs to the right edge */}
//         <div className="relative z-20 -ml-[calc(var(--h)*0.229)] h-[calc(var(--h)*0.514)] flex-1 overflow-hidden border-y border-ink/10 bg-white [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_90%,transparent)]">
//           {/* shadow where the paper enters the slot */}
//           <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink/30 to-transparent" />

//           <motion.div
//             className="flex h-full w-max items-center"
//             animate={reduce ? undefined : { x: ["-50%", "0%"] }}
//             transition={{ duration: 30, ease: "linear", repeat: Infinity }}
//           >
//             {row.map((b, i) => (
//               <span
//                 key={i}
//                 className="flex items-center gap-3 pr-14 font-display text-xl text-ink/60"
//               >
//                 <i
//                   className={`h-2.5 w-2.5 rounded-full ${DOTS[i % 3]} mix-blend-multiply`}
//                 />
//                 {b}
//               </span>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

// Replace with real client names / drop <img> logos in here
const BRANDS = [
  "Brand One",
  "Brand Two",
  "Brand Three",
  "Brand Four",
  "Brand Five",
  "Brand Six",
  "Brand Seven",
  "Brand Eight",
];
const DOTS = ["bg-cyan", "bg-magenta", "bg-yellow"];

// viewBox 320 × 200. The output slot is the open gap on the right:
// x 180 → 320, y 116 → 170. The paper strip (HTML) sits BEHIND this svg,
// so it is only visible through the gap and out to the right.
const VB_W = 320;
const SLOT_TOP = 116;
const SLOT_H = 54;
const SLOT_X = 120; // where the strip starts (hidden behind the body)

function Printer({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F8FA" />
          <stop offset="1" stopColor="#D3D6DF" />
        </linearGradient>
        <linearGradient id={`deck-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A3D48" />
          <stop offset="1" stopColor="#14151A" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A4D5A" />
          <stop offset="0.6" stopColor="#1E2028" />
          <stop offset="1" stopColor="#2B2D36" />
        </linearGradient>
        {/* shadow cast on the paper by the upper lip */}
        <linearGradient id={`lip-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".4" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        {/* shadow at the back of the slot */}
        <linearGradient id={`back-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* paper feeder: tilted sheets sticking out of the top */}
      <g transform="rotate(-8 90 54)">
        <rect x="48" y="6" width="100" height="62" rx="3" fill="#EEF0F5" stroke="#14151A" strokeOpacity=".15" />
        <rect x="40" y="10" width="100" height="62" rx="3" fill="#fff" stroke="#14151A" strokeOpacity=".2" />
        <path d="M52 26H126M52 36H112M52 46H120" stroke="#14151A" strokeOpacity=".12" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* lower body, with the output slot cut out of its right end */}
      <path
        d="M0 92H320V116H180V170H320V178a12 12 0 0 1-12 12H12a12 12 0 0 1-12-12Z"
        fill={`url(#body-${uid})`}
        stroke="#14151A"
        strokeOpacity=".18"
      />

      {/* front window showing the four ink tanks */}
      <rect x="20" y="122" width="140" height="40" rx="8" fill="#14151A" />
      <rect x="30" y="131" width="26" height="22" rx="4" className="fill-cyan" />
      <rect x="62" y="131" width="26" height="22" rx="4" className="fill-magenta" />
      <rect x="94" y="131" width="26" height="22" rx="4" className="fill-yellow" />
      <rect x="126" y="131" width="26" height="22" rx="4" fill="#0A0B0E" stroke="#fff" strokeOpacity=".25" />

      {/* dark scanner lid */}
      <path d="M0 70a16 16 0 0 1 16-16H304a16 16 0 0 1 16 16V92H0Z" fill={`url(#deck-${uid})`} />
      <path d="M0 92H320" stroke="#fff" strokeOpacity=".15" />
      <rect x="16" y="62" width="190" height="22" rx="6" fill={`url(#glass-${uid})`} />
      <path d="M26 64H96L70 82H26Z" fill="#fff" fillOpacity=".07" />

      {/* control panel */}
      <rect x="230" y="60" width="58" height="26" rx="6" fill="#0A0B0E" />
      <rect x="236" y="64" width="46" height="10" rx="2.5" className="fill-cyan" fillOpacity=".4" />
      <circle cx="245" cy="80" r="2.6" className="fill-cyan animate-pulse" />
      <circle cx="257" cy="80" r="2.6" className="fill-magenta" />
      <circle cx="269" cy="80" r="2.6" className="fill-yellow" />

      {/* depth cues inside the slot (drawn over the paper) */}
      <rect x="180" y={SLOT_TOP} width="140" height="10" fill={`url(#lip-${uid})`} />
      <rect x="180" y={SLOT_TOP} width="26" height={SLOT_H} fill={`url(#back-${uid})`} />
    </svg>
  );
}

export default function Brands() {
  const reduce = useReducedMotion();
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="py-20">
      <Reveal className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl tracking-tight text-ink md:text-4xl">
          Trusted by brands that need to be seen.
        </h2>
      </Reveal>

      {/* --w = printer width (about 36% of a 375px phone, max 340px).
          --pad = left gap. Everything else is derived from these two. */}
      <div
        className="relative mt-12 flex overflow-x-clip pt-3"
        style={{
          "--w": "clamp(130px, 34vw, 340px)",
          "--pad": "clamp(12px, 3vw, 32px)",
        }}
      >
        {/* Printer sits IN FRONT of the paper */}
        <div
          className="relative z-10 shrink-0"
          style={{ width: "var(--w)", marginLeft: "var(--pad)" }}
        >
          <Printer className="block h-auto w-full [filter:drop-shadow(0_6px_8px_rgba(20,21,26,0.18))]" />
        </div>

        {/* Paper strip BEHIND the printer: aligned to the slot, runs to the screen edge */}
        <div
          className="absolute z-0 overflow-hidden border-y border-ink/10 bg-white"
          style={{
            top: `calc(var(--w) * ${SLOT_TOP / VB_W} + 0.75rem)`,
            height: `calc(var(--w) * ${SLOT_H / VB_W})`,
            left: `calc(var(--pad) + var(--w) * ${SLOT_X / VB_W})`,
            right: 0,
          }}
        >
          <motion.div
            className="flex h-full w-max items-center"
            style={{ fontSize: "clamp(11px, calc(var(--w) * 0.07), 22px)" }}
            animate={reduce ? undefined : { x: ["-50%", "0%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {row.map((b, i) => (
              <span
                key={i}
                className="flex items-center gap-[0.6em] pr-[2.4em] font-display text-ink/70"
              >
                <i
                  className={`h-[0.55em] w-[0.55em] rounded-full ${DOTS[i % 3]} mix-blend-multiply`}
                />
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}