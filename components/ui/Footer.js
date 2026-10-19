
// "use client";

// import Link from "next/link";
// import { useEffect, useId, useRef, useState } from "react";

// const VBW = 1271;
// const VBH = 599;

// const STOPS = [
//   { offset: 0, color: "#14151A" },
//   { offset: 0.1827, color: "#00B8D9" },
//   { offset: 0.2837, color: "#66D4E6" },
//   { offset: 0.4135, color: "#E6F8FB" },
//   { offset: 0.5866, color: "#FFC400" },
//   { offset: 0.6827, color: "#F5806A" },
//   { offset: 0.8029, color: "#E8368F" },
//   { offset: 1, color: "#E8368F00" },
// ];

// const COMPANY = [
//   { label: "Home", href: "/" },
//   { label: "About", href: "/about-us" },
//   { label: "Services", href: "/services" },
//   { label: "Store", href: "/store" },
//   { label: "Gallery", href: "/gallery" },
//   { label: "Contact", href: "/contact" },
// ];

// const SERVICES = [
//   { n: "01", title: "Flex Printing", href: "/services", dot: "bg-cyan" },
//   { n: "02", title: "Vinyl Printing", href: "/services", dot: "bg-magenta" },
//   { n: "03", title: "UV Printing", href: "/services", dot: "bg-yellow" },
//   { n: "04", title: "Branding Solutions", href: "/services", dot: "bg-ink" },
//   { n: "05", title: "Signage & Display Systems", href: "/services", dot: "bg-cyan" },
//   { n: "06", title: "Laser Cutting", href: "/services", dot: "bg-magenta" },
//   { n: "07", title: "CNC Cutting", href: "/services", dot: "bg-yellow" },
// ];

// const clamp01 = (v) => Math.max(0, Math.min(1, v));

// // Builds the wave silhouette path for a given time (seconds).
// function buildWavePath({ t, samples, peak, valley, waves, speed, amp }) {
//   let top = "";
//   for (let i = 0; i <= samples; i++) {
//     const u = i / samples;
//     // bell envelope: tallest in the middle, `valley` at the edges
//     const d = Math.abs(2 * u - 1);
//     const env = valley + (1 - valley) * (1 - Math.pow(d, 1.24));
//     // horizontal travelling wave (0..1)
//     const w = 0.5 + 0.5 * Math.sin(2 * Math.PI * (u * waves - t * speed));
//     const h = peak * VBH * env * (1 - amp + amp * w);
//     top += `${i === 0 ? "M" : "L"}${(u * VBW).toFixed(1)},${(VBH - h).toFixed(1)} `;
//   }
//   return `${top}L${VBW},${VBH} L0,${VBH} Z`;
// }

// export default function Footer({
//   gradientHeight = "40vh",
//   minReveal = 0.045,
//   peak = 0.98,
//   valley = 0.55,
//   waves = 1.5,   // how many wave crests across the width
//   speed = 0.12,  // cycles per second (higher = faster)
//   amp = 0.35,    // wave depth, 0 = flat, 1 = very deep
//   samples = 96,  // path smoothness
// }) {
//   const uid = useId().replace(/:/g, "");
//   const bandRef = useRef(null);
//   const pathRef = useRef(null);
//   const [progress, setProgress] = useState(minReveal);

//   // Scroll reveal
//   useEffect(() => {
//     const el = bandRef.current;
//     if (!el) return;
//     const measure = () => {
//       const h = el.offsetHeight || 1;
//       const left =
//         document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
//       setProgress(minReveal + (1 - minReveal) * clamp01((h - left) / h));
//     };
//     measure();
//     window.addEventListener("scroll", measure, { passive: true });
//     window.addEventListener("resize", measure, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", measure);
//       window.removeEventListener("resize", measure);
//     };
//   }, [minReveal]);

//   // Wave animation (updates the path directly, no React re-renders)
//   useEffect(() => {
//     const path = pathRef.current;
//     if (!path) return;
//     const opts = { samples, peak, valley, waves, speed, amp };

//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce) {
//       path.setAttribute("d", buildWavePath({ t: 0, ...opts }));
//       return;
//     }

//     let raf;
//     const start = performance.now();
//     const tick = (now) => {
//       path.setAttribute(
//         "d",
//         buildWavePath({ t: (now - start) / 1000, ...opts })
//       );
//       raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [samples, peak, valley, waves, speed, amp]);

//   return (
//     <footer
//       className="w-full overflow-x-clip font-body text-ink"
//       style={{ paddingBottom: gradientHeight }}
//     >
//       <div className="w-full px-10 pt-12">
//         <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-2">
//               <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
//                 <path d="M12 2 22 12 12 22 2 12Z" fill="currentColor" />
//                 <path d="M12 8 16 12 12 16 8 12Z" className="fill-paper" />
//               </svg>
//               <span className="font-mono text-sm uppercase tracking-widest">
//                 Corp Prints
//               </span>
//             </div>
//             <p className="mt-4 max-w-xs text-sm text-ink/60">
//               Visual branding and structural fabrication. From UV printing to
//               illuminated signage and installations.
//             </p>
//           </div>

//           {/* Company */}
//           <nav
//             aria-label="Company"
//             className="font-mono text-xs uppercase tracking-wider"
//           >
//             <h3>Company</h3>
//             <ul className="mt-4 flex flex-col gap-3">
//               {COMPANY.map((l) => (
//                 <li key={l.label}>
//                   <Link
//                     href={l.href}
//                     className="text-ink/60 transition-colors hover:text-ink"
//                   >
//                     {l.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Services */}
//           <nav
//             aria-label="Services"
//             className="font-mono text-xs uppercase tracking-wider lg:col-span-2"
//           >
//             <h3>Services</h3>
//             <ul className="mt-4 flex flex-col gap-3">
//               {SERVICES.map((s) => (
//                 <li key={s.n}>
//                   <Link
//                     href={s.href}
//                     className="flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
//                   >
//                     <span className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
//                     {s.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         {/* Bottom bar */}
//         <div className="flex w-full flex-col items-center justify-between gap-3 border-t border-ink/15 pb-2 pt-6 font-mono text-xs uppercase tracking-wider text-ink/60 sm:flex-row">
//           <span>
//             © {new Date().getFullYear()} Corp Prints | Website developed by
//             KUEAUREX SOLUTIONS
//           </span>
//           <span>Hyderabad · India</span>
//         </div>
//       </div>

//       {/* Scroll-reveal wave glow, fixed to viewport bottom */}
//       <div
//         ref={bandRef}
//         aria-hidden
//         style={{
//           position: "fixed",
//           left: 0,
//           right: 0,
//           bottom: 0,
//           height: gradientHeight,
//           pointerEvents: "none",
//           transformOrigin: "bottom",
//           transform: `scaleY(${progress})`,
//           willChange: "transform",
//         }}
//       >
//         <svg
//           style={{ height: "100%", width: "100%", display: "block" }}
//           viewBox={`0 0 ${VBW} ${VBH}`}
//           preserveAspectRatio="none"
//           fill="none"
//         >
//           <defs>
//             {/* userSpaceOnUse keeps colors anchored, so the wave crests
//                 sweep through the gradient as they move */}
//             <linearGradient
//               id={`g-${uid}`}
//               gradientUnits="userSpaceOnUse"
//               x1="0"
//               y1={VBH}
//               x2="0"
//               y2="0"
//             >
//               {STOPS.map((s, i) => (
//                 <stop key={i} offset={s.offset} stopColor={s.color} />
//               ))}
//             </linearGradient>
//           </defs>
//           <path
//             ref={pathRef}
//             fill={`url(#g-${uid})`}
//             d={buildWavePath({ t: 0, samples, peak, valley, waves, speed, amp })}
//           />
//         </svg>
//       </div>
//     </footer>
//   );
// }
"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const VBW = 1271;
const VBH = 599;

const STOPS = [
  { offset: 0, color: "#14151A" },
  { offset: 0.1827, color: "#00B8D9" },
  { offset: 0.2837, color: "#66D4E6" },
  { offset: 0.4135, color: "#E6F8FB" },
  { offset: 0.5866, color: "#FFC400" },
  { offset: 0.6827, color: "#F5806A" },
  { offset: 0.8029, color: "#E8368F" },
  { offset: 1, color: "#E8368F00" },
];

const COMPANY = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { n: "01", title: "Flex Printing", href: "/services", dot: "bg-cyan" },
  { n: "02", title: "Vinyl Printing", href: "/services", dot: "bg-magenta" },
  { n: "03", title: "UV Printing", href: "/services", dot: "bg-yellow" },
  { n: "04", title: "Branding Solutions", href: "/services", dot: "bg-ink" },
  { n: "05", title: "Signage & Display Systems", href: "/services", dot: "bg-cyan" },
  { n: "06", title: "Laser Cutting", href: "/services", dot: "bg-magenta" },
  { n: "07", title: "CNC Cutting", href: "/services", dot: "bg-yellow" },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// cx: cursor position across the width (0..1)
// a:  how strongly the cursor lifts the glow (0 = resting bell shape)
function buildPath({ samples, peak, valley, cx, a, spread }) {
  let top = "";
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    // resting bell envelope
    const d = Math.abs(2 * u - 1);
    const env = valley + (1 - valley) * (1 - Math.pow(d, 1.24));
    // gaussian bump under the cursor
    const g = Math.exp(-((u - cx) ** 2) / (2 * spread * spread));
    // bump pushes the height toward full, so it never overshoots the band
    const h = peak * VBH * clamp01(env + a * g * (1 - env));
    top += `${i === 0 ? "M" : "L"}${(u * VBW).toFixed(1)},${(VBH - h).toFixed(1)} `;
  }
  return `${top}L${VBW},${VBH} L0,${VBH} Z`;
}

export default function Footer({
  gradientHeight = "40vh",
  minReveal = 0.045,
  peak = 0.98,
  valley = 0.55,
  spread = 0.14,   // width of the bump under the cursor (fraction of page width)
  strength = 1,    // how far the cursor lifts the glow, 0..1
  ease = 0.08,     // follow smoothing per frame (lower = softer, 1 = instant)
  samples = 96,    // path smoothness
}) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef(null);
  const pathRef = useRef(null);
  const [progress, setProgress] = useState(minReveal);

  // Scroll reveal
  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight || 1;
      const left =
        document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setProgress(minReveal + (1 - minReveal) * clamp01((h - left) / h));
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [minReveal]);

  // Mouse interaction. The loop only runs while the glow is still moving,
  // so the footer is fully idle when the cursor is still.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = { cx: 0.5, tcx: 0.5, a: 0, ta: 0 };
    let raf = 0;

    const draw = () =>
      path.setAttribute(
        "d",
        buildPath({ samples, peak, valley, cx: s.cx, a: s.a, spread })
      );

    const tick = () => {
      const e = reduce ? 1 : ease;
      s.cx += (s.tcx - s.cx) * e;
      s.a += (s.ta - s.a) * e;
      draw();
      const settled =
        Math.abs(s.tcx - s.cx) < 0.0005 && Math.abs(s.ta - s.a) < 0.002;
      if (settled) {
        s.cx = s.tcx;
        s.a = s.ta;
        draw();
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      s.tcx = clamp01(e.clientX / window.innerWidth);
      // on first entry, appear under the cursor instead of sliding from center
      if (s.a < 0.02) s.cx = s.tcx;
      s.ta = strength;
      kick();
    };
    const onLeave = () => {
      s.ta = 0;
      kick();
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") onLeave();
    };

    draw();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [samples, peak, valley, spread, strength, ease]);

  return (
    <footer
      className="w-full overflow-x-clip font-body text-ink"
      style={{ paddingBottom: gradientHeight }}
    >
      <div className="w-full px-10 pt-12">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M12 2 22 12 12 22 2 12Z" fill="currentColor" />
                <path d="M12 8 16 12 12 16 8 12Z" className="fill-paper" />
              </svg>
              <span className="font-mono text-sm uppercase tracking-widest">
                Corp Prints
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink/60">
              Visual branding and structural fabrication. From UV printing to
              illuminated signage and installations.
            </p>
          </div>

          {/* Company */}
          <nav
            aria-label="Company"
            className="font-mono text-xs uppercase tracking-wider"
          >
            <h3>Company</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            aria-label="Services"
            className="font-mono text-xs uppercase tracking-wider lg:col-span-2"
          >
            <h3>Services</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.n}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex w-full flex-col items-center justify-between gap-3 border-t border-ink/15 pb-2 pt-6 font-mono text-xs uppercase tracking-wider text-ink/60 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Corp Prints | Website developed by
            KUEAUREX SOLUTIONS
          </span>
          <span>Hyderabad · India</span>
        </div>
      </div>

      {/* Scroll-reveal glow, fixed to viewport bottom */}
      <div
        ref={bandRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: "none",
          transformOrigin: "bottom",
          transform: `scaleY(${progress})`,
          willChange: "transform",
        }}
      >
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id={`g-${uid}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1={VBH}
              x2="0"
              y2="0"
            >
              {STOPS.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            fill={`url(#g-${uid})`}
            d={buildPath({ samples, peak, valley, cx: 0.5, a: 0, spread })}
          />
        </svg>
      </div>
    </footer>
  );
}