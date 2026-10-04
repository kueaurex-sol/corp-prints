// "use client";
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// function FlowSection({ bg, fg, children }) {
//   return (
//     <section
//       data-flow-section
//       className="relative min-h-screen w-full overflow-hidden"
//       style={{ backgroundColor: bg, color: fg }}
//     >
//       <div
//         className="flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[6vw] pb-[6vw] pt-[clamp(6rem,10vw,8rem)] will-change-transform"
//         style={{ transformOrigin: "bottom left" }}
//       >
//         {children}
//       </div>
//     </section>
//   );
// }

// const RULE = (tone) => <hr className={`my-[2vw] border-none border-t ${tone}`} />;

// // Drafted brand-journey copy in Corp Prints' CMYK palette — swap in real
// // milestones, figures, and dates.
// const SECTIONS = [
//   {
//     bg: "#14151A",
//     fg: "#F7F7F5",
//     eyebrow: "01 — Where we started",
//     heading: ["Flex &", "Vinyl", "First"],
//     rule: "border-white/20",
//     body: "Corp Prints began as a small shop doing flex banners and vinyl graphics for local storefronts — fast turnaround, straightforward pricing, work that held up outdoors.",
//   },
//   {
//     bg: "#00AEEF",
//     fg: "#14151A",
//     eyebrow: "02 — How we grew",
//     heading: ["One Roof", "Every", "Finish"],
//     rule: "border-ink/25",
//     body: "As clients asked for more, we brought it in-house: UV printing with white ink, illuminated signage, laser and CNC fabrication.",
//     grid: [
//       { t: "Printing", d: "Flex, vinyl and UV, across fabric, acrylic, glass and ACP." },
//       { t: "Signage", d: "LED, edge-glow and liquid-acrylic displays." },
//       { t: "Fabrication", d: "Laser and CNC cutting for decor and structure." },
//     ],
//   },
//   {
//     bg: "#F5F6FA",
//     fg: "#14151A",
//     eyebrow: "03 — How it works",
//     heading: ["Brief.", "Build.", "Install."],
//     rule: "border-ink/20",
//     body: "Three steps, start to finish — handled by the same team throughout.",
//     grid: [
//       { t: "01 — Brief", d: "We scope the material, size and timeline with you." },
//       { t: "02 — Fabricate", d: "Print, cut and build it under one roof." },
//       { t: "03 — Install", d: "Fitted and finished on site, by our own crew." },
//     ],
//   },
//   {
//     bg: "#EC008C",
//     fg: "#F7F7F5",
//     eyebrow: "04 — The vision",
//     heading: ["Every", "Surface,", "On Brand"],
//     rule: "border-white/30",
//     body: "Printed, lit, or built — we want every surface a client puts their name on to carry it without compromise. That means staying hands-on with the work, not just the quote.",
//   },
//   {
//     bg: "#14151A",
//     fg: "#F7F7F5",
//     eyebrow: "05 — Join us",
//     heading: ["Let's", "Build", "It."],
//     rule: "border-white/20",
//     body: "Have something to print, light up, or install? Tell us what you're working on.",
//     cta: { label: "Start your project", href: "/contact" },
//   },
// ];

// export default function BrandJourneyScrollStory() {
//   const containerRef = useRef(null);
//   const [reducedMotion, setReducedMotion] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const update = () => setReducedMotion(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current || reducedMotion) return;

//     const ctx = gsap.context(() => {
//       const sections = Array.from(containerRef.current.querySelectorAll("[data-flow-section]"));
//       if (!sections.length) return;

//       sections.forEach((section, i) => {
//         gsap.set(section, { zIndex: i + 1 });
//         const inner = section.querySelector(".flow-art-container");
//         if (!inner) return;

//         if (i > 0) {
//           gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
//           gsap.to(inner, {
//             rotation: 0,
//             ease: "none",
//             scrollTrigger: { trigger: section, start: "top bottom", end: "top 25%", scrub: true },
//           });
//         }
//         if (i < sections.length - 1) {
//           ScrollTrigger.create({ trigger: section, start: "bottom bottom", end: "bottom top", pin: true, pinSpacing: false });
//         }
//       });

//       ScrollTrigger.refresh();
//     }, containerRef);

//     return () => ctx.revert();
//   }, [reducedMotion]);

//   return (
//     <main ref={containerRef} aria-label="Brand journey and story" className="w-full overflow-x-hidden">
//       {SECTIONS.map((s) => (
//         <FlowSection key={s.eyebrow} bg={s.bg} fg={s.fg}>
//           <p className="font-display text-xs font-bold uppercase tracking-[0.2em]">{s.eyebrow}</p>
//           {RULE(s.rule)}
//           <h2 className="font-display text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight">
//             {s.heading.map((line) => (
//               <span key={line} className="block">{line}</span>
//             ))}
//           </h2>
//           {RULE(s.rule)}
//           <p className="max-w-[50ch] text-[clamp(1rem,2.2vw,1.5rem)] leading-relaxed">{s.body}</p>

//           {s.grid && (
//             <>
//               {RULE(s.rule)}
//               <div className="flex flex-wrap gap-[4vw]">
//                 {s.grid.map((g) => (
//                   <div key={g.t} className="min-w-[160px] flex-1">
//                     <p className="mb-2 font-display text-sm font-bold uppercase tracking-wider">{g.t}</p>
//                     <p className="text-sm leading-relaxed opacity-75 md:text-base">{g.d}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {s.cta && (
//             <a
//               href={s.cta.href}
//               className="mt-auto inline-block w-fit rounded-full bg-[currentColor] px-7 py-3.5 text-sm font-medium"
//               style={{ color: s.bg, backgroundColor: s.fg }}
//             >
//               {s.cta.label}
//             </a>
//           )}
//         </FlowSection>
//       ))}
//     </main>
//   );
// }
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INKS = ["#00B8D9", "#E8368F", "#FFC400", "#14151A"];

const HALFTONE = {
  backgroundImage: "radial-gradient(currentColor 1.3px, transparent 1.7px)",
  backgroundSize: "14px 14px",
  WebkitMaskImage: "linear-gradient(135deg, transparent 35%, #000 100%)",
  maskImage: "linear-gradient(135deg, transparent 35%, #000 100%)",
};

function Crop({ className }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute z-10 h-5 w-5 opacity-40 ${className}`}
    >
      <path d="M12 0V9M12 24V15M0 12H9M24 12H15" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function RegMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 opacity-60">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 1V23M1 12H23" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// bg/fg go on the INNER card, so the coloured card itself is what tilts.
// The outer <section> stays transparent.
function FlowSection({ bg, fg, children }) {
  return (
    <section data-flow-section className="relative min-h-screen w-full overflow-hidden">
      <div
        className="flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[6vw] pb-[6vw] pt-[clamp(6rem,10vw,8rem)] will-change-transform"
        style={{
          backgroundColor: bg,
          color: fg,
          transformOrigin: "bottom left",
          boxShadow: "0 -24px 60px rgba(20,21,26,0.35)",
        }}
      >
        {/* CMYK colour bar along the leading edge */}
        <div aria-hidden className="absolute inset-x-0 top-0 z-10 flex h-1.5">
          {INKS.map((c) => (
            <span key={c} className="h-full flex-1" style={{ background: c }} />
          ))}
        </div>

        {/* halftone fade, bottom-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[55%] opacity-[0.12]"
          style={HALFTONE}
        />

        {/* crop marks */}
        <Crop className="right-[3vw] top-[clamp(4.5rem,8vw,6.5rem)]" />
        <Crop className="bottom-[3vw] left-[3vw]" />
        <Crop className="bottom-[3vw] right-[3vw]" />

        {children}
      </div>
    </section>
  );
}

const RULE = <div aria-hidden className="my-[2vw] h-px w-full bg-current opacity-25" />;

// Drafted brand-journey copy — swap in real milestones, figures, and dates.
// Colour order walks the four inks: K → C → Y → M → K
const SECTIONS = [
  {
    bg: "#14151A",
    fg: "#F7F7F5",
    eyebrow: "01 — Where we started",
    heading: ["Flex &", "Vinyl", "First"],
    body: "Corp Prints began as a small shop doing flex banners and vinyl graphics for local storefronts — fast turnaround, straightforward pricing, work that held up outdoors.",
  },
  {
    bg: "#00B8D9",
    fg: "#14151A",
    eyebrow: "02 — How we grew",
    heading: ["One Roof", "Every", "Finish"],
    body: "As clients asked for more, we brought it in-house: UV printing with white ink, illuminated signage, laser and CNC fabrication.",
    grid: [
      { t: "Printing", d: "Flex, vinyl and UV, across fabric, acrylic, glass and ACP." },
      { t: "Signage", d: "LED, edge-glow and liquid-acrylic displays." },
      { t: "Fabrication", d: "Laser and CNC cutting for decor and structure." },
    ],
  },
  {
    bg: "#FFC400",
    fg: "#14151A",
    eyebrow: "03 — How it works",
    heading: ["Brief.", "Build.", "Install."],
    body: "Three steps, start to finish — handled by the same team throughout.",
    grid: [
      { t: "01 — Brief", d: "We scope the material, size and timeline with you." },
      { t: "02 — Fabricate", d: "Print, cut and build it under one roof." },
      { t: "03 — Install", d: "Fitted and finished on site, by our own crew." },
    ],
  },
  {
    bg: "#E8368F",
    fg: "#F7F7F5",
    eyebrow: "04 — The vision",
    heading: ["Every", "Surface,", "On Brand"],
    body: "Printed, lit, or built — we want every surface a client puts their name on to carry it without compromise. That means staying hands-on with the work, not just the quote.",
  },
  {
    bg: "#14151A",
    fg: "#F7F7F5",
    eyebrow: "05 — Join us",
    heading: ["Let's", "Build", "It."],
    body: "Have something to print, light up, or install? Tell us what you're working on.",
    cta: { label: "Start your project", href: "/contact" },
  },
];

export default function BrandJourneyScrollStory() {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = Array.from(containerRef.current.querySelectorAll("[data-flow-section]"));
      if (!sections.length) return;

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });
        const inner = section.querySelector(".flow-art-container");
        if (!inner) return;

        // Next card arrives tilted from the bottom-left and straightens as it rises
        if (i > 0) {
          gsap.set(inner, { rotation: 30, transformOrigin: "bottom left" });
          gsap.to(inner, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        // Previous card stays pinned underneath while the next one covers it
        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }
      });
    }, containerRef);

    // Re-measure whenever content above changes height (images, fonts, route load)
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    refresh();

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Brand journey and story"
      className="relative isolate w-full overflow-x-clip"
    >
      {SECTIONS.map((s) => (
        <FlowSection key={s.eyebrow} bg={s.bg} fg={s.fg}>
          <div className="relative z-10 flex items-center justify-between gap-4">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em]">{s.eyebrow}</p>
            <div className="flex items-center gap-3">
              <span className="flex overflow-hidden rounded-sm">
                {INKS.map((c) => (
                  <i key={c} className="h-3 w-3" style={{ background: c }} />
                ))}
              </span>
              <RegMark />
            </div>
          </div>

          <div className="relative z-10">{RULE}</div>

          <h2 className="relative z-10 font-display text-[clamp(3rem,11vw,9rem)] font-bold uppercase leading-[0.9] tracking-tight">
            {s.heading.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h2>

          <div className="relative z-10">{RULE}</div>

          <p className="relative z-10 max-w-[50ch] text-[clamp(1rem,2.2vw,1.5rem)] leading-relaxed">
            {s.body}
          </p>

          {s.grid && (
            <div className="relative z-10">
              {RULE}
              <div className="flex flex-wrap gap-[4vw]">
                {s.grid.map((g) => (
                  <div key={g.t} className="min-w-[160px] flex-1">
                    <p className="mb-2 font-display text-sm font-bold uppercase tracking-wider">{g.t}</p>
                    <p className="text-sm leading-relaxed opacity-75 md:text-base">{g.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {s.cta && (
            <a
              href={s.cta.href}
              className="relative z-10 mt-auto inline-block w-fit rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-[1.03]"
              style={{ color: s.bg, backgroundColor: s.fg }}
            >
              {s.cta.label}
            </a>
          )}
        </FlowSection>
      ))}
    </div>
  );
}