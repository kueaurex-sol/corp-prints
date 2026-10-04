import Reveal from "./Reveal";

const PILLARS = [
  { c: "bg-cyan", t: "Design", d: "Artwork and layouts prepared for the material they will be produced on." },
  { c: "bg-magenta", t: "Fabricate", d: "UV, vinyl, flex, laser and CNC work under one roof." },
  { c: "bg-yellow", t: "Install", d: "Facades, hoardings, arches and lighting, fitted and finished." },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl">
            Creative design, joined to fabrication technology.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-ink/70 md:text-lg">
            Corp Prints is a visual branding and structural fabrication firm. We make durable,
            high-impact visual communication for corporate, retail and event clients, from
            white-ink UV printing and illuminated signage to architectural displays and structural lighting.
          </p>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {PILLARS.map((p, k) => (
          <Reveal key={p.t} delay={k * 0.1}>
            <div className="h-full rounded-3xl border border-ink/10 bg-white/70 p-7 backdrop-blur-sm">
              <span className={`block h-3 w-3 rounded-full ${p.c} mix-blend-multiply`} />
              <h3 className="mt-6 font-display text-xl text-ink">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
// "use client";
// import { motion } from "motion/react";
// import Reveal from "./Reveal";

// const PILLARS = [
//   { c: "bg-cyan", t: "Design", d: "Artwork and layouts prepared for the material they will be produced on." },
//   { c: "bg-magenta", t: "Fabricate", d: "UV, vinyl, flex, laser and CNC work under one roof." },
//   { c: "bg-yellow", t: "Install", d: "Facades, hoardings, arches and lighting, fitted and finished." },
// ];

// export default function About() {
//   return (
//     <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
//       <Reveal>
//         <div className="relative" style={{ perspective: "1800px" }}>
//           {/* the box: a slight tilt plus visible beveled edges is what sells
//               the glass-cube read, rather than a flat frosted card */}
//           <div
//             className="relative rounded-[1.75rem] p-[2px] md:rounded-[2.25rem] md:p-[3px]"
//             style={{
//               transform: "rotateX(2.5deg)",
//               transformStyle: "preserve-3d",
//               background:
//                 "linear-gradient(155deg, rgba(255,255,255,.95), rgba(200,205,215,.35) 30%, rgba(255,255,255,.15) 55%, rgba(190,195,205,.5) 78%, rgba(255,255,255,.95))",
//               boxShadow:
//                 "0 60px 100px -50px rgba(20,21,26,.35), inset 0 0 0 1px rgba(255,255,255,.6)",
//             }}
//           >
//             <div className="relative overflow-hidden rounded-[1.6rem] bg-white/12 backdrop-blur-xl md:rounded-[2.1rem]">
//               {/* top rim: the brightest edge of the box, lit from above */}
//               <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-white/90" />
//               <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 via-white/15 to-transparent" />

//               {/* the glossy diagonal sweep across the front pane */}
//               <div className="pointer-events-none absolute -inset-y-16 left-[-20%] w-1/3 -rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-md" />

//               {/* corner glints, like light catching the seams */}
//               <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-br-[2rem] bg-gradient-to-br from-white/70 to-transparent" />
//               <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-bl-[2rem] bg-gradient-to-bl from-white/60 to-transparent" />

//               {/* faint colour catching the inside edges of the acrylic */}
//               <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan/20 blur-3xl" />
//               <div className="pointer-events-none absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-magenta/15 blur-3xl" />

//               <div className="relative p-8 md:p-14">
//                 <div className="grid gap-12 md:grid-cols-2 md:gap-16">
//                   <h2 className="font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl">
//                     Creative design, joined to fabrication technology.
//                   </h2>
//                   <p className="text-base leading-relaxed text-ink/70 md:text-lg">
//                     Corp Prints is a visual branding and structural fabrication firm. We make durable,
//                     high-impact visual communication for corporate, retail and event clients, from
//                     white-ink UV printing and illuminated signage to architectural displays and structural lighting.
//                   </p>
//                 </div>

//                 <div className="mt-14 grid gap-4 md:grid-cols-3">
//                   {PILLARS.map((p) => (
//                     <div key={p.t} className="h-full rounded-3xl border border-white/50 bg-white/45 p-7 backdrop-blur-sm">
//                       <span className={`block h-3 w-3 rounded-full ${p.c} mix-blend-multiply`} />
//                       <h3 className="mt-6 font-display text-xl text-ink">{p.t}</h3>
//                       <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.d}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* reflection: the box mirrored and faded, as if standing on a
//               glossy surface, matching the reference photo */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-x-6 top-full h-24 opacity-30 md:h-32"
//             style={{
//               transform: "scaleY(-1)",
//               maskImage: "linear-gradient(to bottom, black, transparent)",
//               WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
//             }}
//           >
//             <div className="h-full w-full rounded-[1.75rem] bg-gradient-to-b from-white/70 via-white/20 to-transparent blur-[2px] md:rounded-[2.25rem]" />
//           </div>
//         </div>
//       </Reveal>
//     </section>
//   );
// }