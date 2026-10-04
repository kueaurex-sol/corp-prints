// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "motion/react";

// import { cn } from "@/lib/utils/cn";

// // Each category gets its own soft CMYK mesh behind the card
// const mesh = (a, b, c) =>
//   `radial-gradient(60% 50% at 15% 10%, ${a}, transparent 70%), radial-gradient(55% 50% at 90% 30%, ${b}, transparent 70%), radial-gradient(60% 55% at 40% 100%, ${c}, transparent 70%), #fff`;
// const C = "rgba(0,174,239,.45)", M = "rgba(236,0,140,.35)", Y = "rgba(255,242,0,.55)";

// const FEATURES = [
//   { id: "printing", label: "Printing", bg: mesh(C, Y, M), description: "Large-format print for campaigns and commercial branding.",
//     points: ["Flex banners & hoardings", "Vinyl: wall, glass, vehicle, floor", "UV printing with white ink", "Acrylic, ACP, glass, fabric"] },
//   { id: "branding", label: "Branding Solutions", bg: mesh(M, C, Y), description: "Indoor and outdoor branding at scale.",
//     points: ["Hoarding & facade branding", "Aluminum frame installations", "Canter van & fleet wrapping", "Cluster displays & cube boxes"] },
//   { id: "signage", label: "Signage & Displays", bg: mesh(Y, M, C), description: "Custom signage and retail display hardware.",
//     points: ["Acrylic LED, edge-glow, embossed", "LED & glow sign boards", "Liquid acrylic signage", "MS frames, drop downs, look walkers"] },
//   { id: "cutting", label: "Cutting & Fabrication", bg: mesh(C, M, Y), description: "Precision laser and CNC work.",
//     points: ["Laser: acrylic, models, gifts", "Interior designer cuttings", "CNC: doors, MDF, WPVC", "Wood engraving & metal routing"] },
//   { id: "lighting", label: "Lighting & Structures", bg: mesh(Y, C, M), description: "Permanent and event installations.",
//     points: ["Arches & architectural lighting", "Structural hoardings", "Facade lighting & framing", "Mobile canter van display rigs"] },
// ];
// const ITEM_HEIGHT = 65;
// const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

// export default function Services() {
//   const [step, setStep] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const n = FEATURES.length;
//   const current = ((step % n) + n) % n;

//   useEffect(() => {
//     if (paused) return;
//     const t = setInterval(() => setStep((s) => s + 1), 3500);
//     return () => clearInterval(t);
//   }, [paused]);

//   const status = (i) => {
//     let d = i - current;
//     if (d > n / 2) d -= n;
//     if (d < -n / 2) d += n;
//     return d === 0 ? "active" : d === -1 ? "prev" : d === 1 ? "next" : "hidden";
//   };

//   return (
//     <section id="services" className="mx-auto w-[100vw] px-4 py-20 md:px-8">
//       <h2 className="mb-10 px-2 font-display text-3xl tracking-tight text-ink md:text-5xl">What we make</h2>
//       <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-ink/10 lg:aspect-video lg:flex-row lg:rounded-[4rem]">
//         <div className="relative z-30 flex min-h-[350px] w-full items-center overflow-hidden bg-ink px-8 md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
//           <div className="absolute inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-ink to-transparent" />
//           <div className="absolute inset-x-0 bottom-0 z-40 h-16 bg-gradient-to-t from-ink to-transparent" />
//           <div className="relative flex h-full w-full items-center justify-center lg:justify-start">
//             {FEATURES.map((f, i) => {
//               const dist = wrap(-n / 2, n / 2, i - current);
//               const active = i === current;
//               return (
//                 <motion.div key={f.id} style={{ height: ITEM_HEIGHT, width: "fit-content" }}
//                   animate={{ y: dist * ITEM_HEIGHT, opacity: 1 - Math.abs(dist) * 0.3 }}
//                   transition={{ type: "spring", stiffness: 90, damping: 22 }}
//                   className="absolute flex items-center">
//                   <button onClick={() => setStep((s) => s + ((i - current + n) % n))}
//                     onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
//                     className={cn("flex items-center gap-3 rounded-full border px-6 py-3.5 text-left text-sm transition-all duration-700 md:px-8",
//                       active ? "border-white bg-white text-ink" : "border-white/20 text-white/60 hover:border-white/40 hover:text-white")}>
//                     <span className="flex gap-0.5">
//                       {["#00AEEF", "#EC008C", "#FFF200"].map((c) => <i key={c} className="h-2 w-2 rounded-full" style={{ background: c, opacity: active ? 1 : 0.4 }} />)}
//                     </span>
//                     <span className="whitespace-nowrap font-display tracking-tight">{f.label}</span>
//                   </button>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="relative flex min-h-[520px] flex-1 items-center justify-center overflow-hidden bg-paper px-6 py-16 lg:h-full lg:border-l lg:border-ink/10">
//           <div className="relative aspect-[4/5] w-full max-w-[420px]">
//             {FEATURES.map((f, i) => {
//               const s = status(i), active = s === "active";
//               return (
//                 <motion.div key={f.id} initial={false}
//                   animate={{ x: active ? 0 : s === "prev" ? -100 : s === "next" ? 100 : 0,
//                     scale: active ? 1 : s === "hidden" ? 0.7 : 0.85,
//                     opacity: active ? 1 : s === "hidden" ? 0 : 0.4,
//                     rotate: s === "prev" ? -3 : s === "next" ? 3 : 0,
//                     zIndex: active ? 20 : s === "hidden" ? 0 : 10 }}
//                   transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
//                   style={{ background: f.bg, pointerEvents: active ? "auto" : "none" }}
//                   className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[2rem] border-4 border-white p-8 shadow-xl md:rounded-[2.8rem] md:border-8">
//                   <AnimatePresence>
//                     {active && (
//                       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
//                         <h3 className="font-display text-2xl leading-tight tracking-tight text-ink md:text-3xl">{f.description}</h3>
//                         <ul className="mt-5 space-y-2">
//                           {f.points.map((p) => (
//                             <li key={p} className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm text-ink backdrop-blur">
//                               <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />{p}
//                             </li>
//                           ))}
//                         </ul>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils/cn";

// Each category gets its own soft CMYK mesh behind the card
const mesh = (a, b, c) =>
  `radial-gradient(60% 50% at 15% 10%, ${a}, transparent 70%), radial-gradient(55% 50% at 90% 30%, ${b}, transparent 70%), radial-gradient(60% 55% at 40% 100%, ${c}, transparent 70%), #fff`;
const C = "rgba(0,174,239,.45)", M = "rgba(236,0,140,.35)", Y = "rgba(255,242,0,.55)";

// const FEATURES = [
//   { id: "printing", label: "Printing", bg: mesh(C, Y, M), description: "Large-format print for campaigns and commercial branding.",
//     points: ["Flex banners & hoardings", "Vinyl: wall, glass, vehicle, floor", "UV printing with white ink", "Acrylic, ACP, glass, fabric"] },
//   { id: "branding", label: "Branding Solutions", bg: mesh(M, C, Y), description: "Indoor and outdoor branding at scale.",
//     points: ["Hoarding & facade branding", "Aluminum frame installations", "Canter van & fleet wrapping", "Cluster displays & cube boxes"] },
//   { id: "signage", label: "Signage & Displays", bg: mesh(Y, M, C), description: "Custom signage and retail display hardware.",
//     points: ["Acrylic LED, edge-glow, embossed", "LED & glow sign boards", "Liquid acrylic signage", "MS frames, drop downs, look walkers"] },
//   { id: "cutting", label: "Cutting & Fabrication", bg: mesh(C, M, Y), description: "Precision laser and CNC work.",
//     points: ["Laser: acrylic, models, gifts", "Interior designer cuttings", "CNC: doors, MDF, WPVC", "Wood engraving & metal routing"] },
//   { id: "lighting", label: "Lighting & Structures", bg: mesh(Y, C, M), description: "Permanent and event installations.",
//     points: ["Arches & architectural lighting", "Structural hoardings", "Facade lighting & framing", "Mobile canter van display rigs"] },
// ];
const FEATURES = [
  {
    id: "flex",
    label: "Flex Printing",
    bg: mesh(C, Y, M),
    description: "Large-format printing for marketing campaigns, environmental graphics and commercial branding.",
    points: ["Flex Printing Banners", "Hoardings", "Event & Promotional Banners"],
  },
  {
    id: "vinyl",
    label: "Vinyl Printing",
    bg: mesh(M, C, Y),
    description: "Self-adhesive vinyl graphics for walls, glass, vehicles, floors and stores.",
    points: [
      "Self-Adhesive Vinyl Graphics",
      "Interior Wall Graphics",
      "Glass & Window Graphics",
      "Automotive Graphics",
      "Floor Graphics",
      "In-Store Branding",
    ],
  },
  {
    id: "uv",
    label: "UV Printing",
    bg: mesh(Y, M, C),
    description: "UV printing with white ink across rigid and flexible surfaces.",
    points: [
      "Fabric Printing",
      "Acrylic Printing",
      "SunBoard Printing",
      "Flute Printing",
      "Laminate Printing",
      "Glass Printing",
      "ACP",
      "UV Vinyl Printing",
      "UV Flex Printing",
    ],
  },
  {
    id: "branding",
    label: "Branding Solutions",
    bg: mesh(C, M, Y),
    description: "Large-scale indoor and outdoor branding for corporate establishments, commercial properties, public campaigns and events.",
    points: [
      "Facade Branding",
      "Aluminum Frame Installations",
      "Canter Van Display Printing",
      "Cluster Displays & Cube Boxes",
    ],
  },
  {
    id: "signage",
    label: "Signage & Display",
    bg: mesh(Y, C, M),
    description: "Custom architectural signage, illumination fixtures and retail display hardware for premium brand presence.",
    points: [
      "Acrylic Sign Boards (LED-lit, edge-glow, embossed)",
      "LED & Glow Sign Boards",
      "Liquid Acrylic Fabricated Signage",
      "Window Concepts, Cluster Display & Visual Merchandising",
      "Arches Installation & Lighting Works",
      "MS Frame Fabrication, Drop Downs & Look Walkers",
    ],
  },
  {
    id: "laser",
    label: "Laser Cutting",
    bg: mesh(M, Y, C),
    description: "High-precision cutting for architectural decor, structural signage and custom brand elements.",
    points: [
      "Acrylic Signage Cuttings",
      "Interior Designer Cuttings",
      "Miniature Model Cuttings",
      "Gifts & Crafts Cutting",
    ],
  },
  {
    id: "cnc",
    label: "CNC Cutting",
    bg: mesh(C, Y, M),
    description: "CNC carving, routing and engraving in wood, MDF and metal.",
    points: [
      "Door Carvings",
      "MDF & WPVC Cutting",
      "Intricate Furniture Panels",
      "Wood Engraving",
      "Metal CNC",
    ],
  },
];
const ITEM_HEIGHT = 65; // vertical spacing (desktop)
const PILL_W_DESKTOP = 300; // same width for every pill
const PILL_W_MOBILE = 260;
const MOBILE_GAP = 16; // horizontal gap between pills (mobile)

const wrap = (min, max, v) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

export default function Services() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const n = FEATURES.length;
  const current = ((step % n) + n) % n;

  // Below the lg breakpoint (1024px) the labels scroll horizontally
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setStep((s) => s + 1), 3500);
    return () => clearInterval(t);
  }, [paused]);

  const status = (i) => {
    let d = i - current;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d === 0 ? "active" : d === -1 ? "prev" : d === 1 ? "next" : "hidden";
  };

  const pillW = isMobile ? PILL_W_MOBILE : PILL_W_DESKTOP;
  const stepX = PILL_W_MOBILE + MOBILE_GAP;

  return (
    <section id="services" className="mx-auto w-full px-4 py-20 md:px-8">
      <h2 className="mb-10 px-2 font-display text-3xl tracking-tight text-ink md:text-5xl">What we make</h2>
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-ink/10 lg:aspect-video lg:flex-row lg:rounded-[4rem]">
        {/* Labels: horizontal strip on mobile, vertical wheel on desktop */}
        <div className="relative z-30 flex h-36 w-full items-center overflow-hidden bg-ink px-8 md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
          {/* Fade masks: left/right on mobile, top/bottom on desktop */}
          <div className="absolute inset-y-0 left-0 z-40 w-12 bg-gradient-to-r from-ink to-transparent lg:inset-x-0 lg:inset-y-auto lg:top-0 lg:h-16 lg:w-auto lg:bg-gradient-to-b" />
          <div className="absolute inset-y-0 right-0 z-40 w-12 bg-gradient-to-l from-ink to-transparent lg:inset-x-0 lg:inset-y-auto lg:bottom-0 lg:h-16 lg:w-auto lg:bg-gradient-to-t" />

          <div className="relative flex h-full w-full items-center justify-center lg:justify-start">
            {FEATURES.map((f, i) => {
              const dist = wrap(-n / 2, n / 2, i - current);
              const active = i === current;
              return (
                <motion.div
                  key={f.id}
                  style={{ height: ITEM_HEIGHT, width: pillW }}
                  animate={
                    isMobile
                      ? { x: dist * stepX, y: 0, opacity: 1 - Math.abs(dist) * 0.3 }
                      : { x: 0, y: dist * ITEM_HEIGHT, opacity: 1 - Math.abs(dist) * 0.3 }
                  }
                  transition={{ type: "spring", stiffness: 90, damping: 22 }}
                  className="absolute flex items-center"
                >
                  <button
                    onClick={() => setStep((s) => s + ((i - current + n) % n))}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    className={cn(
                      "flex w-full items-center justify-start gap-3 rounded-full border px-6 py-3.5 text-left text-sm transition-all duration-700 md:px-8",
                      active
                        ? "border-white bg-white text-ink"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                    )}
                  >
                    <span className="flex gap-0.5">
                      {["#00AEEF", "#EC008C", "#FFF200"].map((c) => (
                        <i key={c} className="h-2 w-2 rounded-full" style={{ background: c, opacity: active ? 1 : 0.4 }} />
                      ))}
                    </span>
                    <span className="whitespace-nowrap font-display tracking-tight">{f.label}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[520px] flex-1 items-center justify-center overflow-hidden bg-paper px-6 py-16 lg:h-full lg:border-l lg:border-ink/10">
          <div className="relative aspect-[4/5] w-full max-w-[420px]">
            {FEATURES.map((f, i) => {
              const s = status(i), active = s === "active";
              return (
                <motion.div
                  key={f.id}
                  initial={false}
                  animate={{
                    x: active ? 0 : s === "prev" ? -100 : s === "next" ? 100 : 0,
                    scale: active ? 1 : s === "hidden" ? 0.7 : 0.85,
                    opacity: active ? 1 : s === "hidden" ? 0 : 0.4,
                    rotate: s === "prev" ? -3 : s === "next" ? 3 : 0,
                    zIndex: active ? 20 : s === "hidden" ? 0 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  style={{ background: f.bg, pointerEvents: active ? "auto" : "none" }}
                  className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[2rem] border-4 border-white p-8 shadow-xl md:rounded-[2.8rem] md:border-8"
                >
                  <AnimatePresence>
                    {active && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink md:text-3xl">{f.description}</h3>
                        <ul className="mt-5 space-y-2">
                          {f.points.map((p) => (
                            <li key={p} className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm text-ink backdrop-blur">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-magenta" />{p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}