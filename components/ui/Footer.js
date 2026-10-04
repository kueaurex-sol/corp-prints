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
//   { label: "About", href: "/about" },
//   { label: "Mission", href: "/about#mission" },
//   { label: "Portfolio", href: "/portfolio" },
//   { label: "Contact", href: "/contact" },
// ];

// const SERVICES = [
//   { n: "01", title: "Printing", href: "/services#printing", dot: "bg-cyan" },
//   { n: "02", title: "Branding Solutions", href: "/services#branding", dot: "bg-magenta" },
//   { n: "03", title: "Signage & Display Systems", href: "/services#signage", dot: "bg-yellow" },
//   { n: "04", title: "Cutting, Engraving & Fabrication", href: "/services#fabrication", dot: "bg-ink" },
//   { n: "05", title: "Lighting & Structural Installations", href: "/services#lighting", dot: "bg-cyan" },
// ];

// function bellHeights(n, peak, valley) {
//   const mid = (n - 1) / 2;
//   return Array.from({ length: n }, (_, i) => {
//     const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
//     return peak * VBH * (valley + (1 - valley) * (1 - Math.pow(t, 1.24)));
//   });
// }

// const clamp01 = (v) => Math.max(0, Math.min(1, v));

// export default function Footer({
//   gradientHeight = "40vh",
//   minReveal = 0.045,
//   bars = 9,
//   blur = 15,
//   peak = 0.98,
//   valley = 0.55,
// }) {
//   const uid = useId().replace(/:/g, "");
//   const bandRef = useRef(null);
//   const [progress, setProgress] = useState(minReveal);

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

//   const colW = VBW / bars;

//   return (
//     <footer className="font-body text-ink" style={{ paddingBottom: gradientHeight }}>
//       <div className=" w-full max-w-5xl px-6 pt-12">
//                <div className="grid gap-10 pb-10 w-[100vw] px-10 sm:grid-cols-2 lg:grid-cols-5 justify-between">
//           {/* Brand + newsletter */}
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

//             <div className="mt-6 flex max-w-xs gap-2">
//               <input
//                 type="email"
//                 aria-label="Email address"
//                 placeholder="you@company.com"
//                 className="h-9 w-full rounded-md border border-ink/15 bg-transparent px-3 text-sm placeholder:text-ink/50 focus:border-ink/40 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 className="h-9 shrink-0 rounded-md bg-ink px-3 font-mono text-xs uppercase tracking-wider text-paper transition-opacity hover:opacity-90"
//               >
//                 Join
//               </button>
//             </div>
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

//           {/* Services (beside Company) */}
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
//         <div className="flex flex-col items-center w-[96vw] justify-between gap-3 border-t border-ink/15 pb-2 pt-6 font-mono text-xs uppercase tracking-wider text-ink/60 sm:flex-row">
//           <span>© {new Date().getFullYear()} Corp Prints</span>
//           <span className="flex items-center gap-2">
//             <span className="size-1.5 rounded-full bg-magenta" />
//             UV Printing · Signage · Fabrication
//           </span>
//           <span>Hyderabad · India</span>
//         </div>
//       </div>

//       {/* Scroll-reveal glow, fixed to viewport bottom */}
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
//             <linearGradient id={`g-${uid}`} x1="0" y1="1" x2="0" y2="0">
//               {STOPS.map((s, i) => (
//                 <stop key={i} offset={s.offset} stopColor={s.color} />
//               ))}
//             </linearGradient>
//             <filter id={`b-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
//               <feGaussianBlur stdDeviation={blur} />
//             </filter>
//           </defs>
//           {bellHeights(bars, peak, valley).map((h, i) => (
//             <g key={i} filter={`url(#b-${uid})`}>
//               <rect
//                 x={i * colW}
//                 y={VBH - h}
//                 width={colW * 1.23}
//                 height={h}
//                 fill={`url(#g-${uid})`}
//               />
//             </g>
//           ))}
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
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { n: "01", title: "Printing", href: "/services#printing", dot: "bg-cyan" },
  { n: "02", title: "Branding Solutions", href: "/services#branding", dot: "bg-magenta" },
  { n: "03", title: "Signage & Display Systems", href: "/services#signage", dot: "bg-yellow" },
  { n: "04", title: "Cutting, Engraving & Fabrication", href: "/services#fabrication", dot: "bg-ink" },
  { n: "05", title: "Lighting & Structural Installations", href: "/services#lighting", dot: "bg-cyan" },
];

function bellHeights(n, peak, valley) {
  const mid = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    return peak * VBH * (valley + (1 - valley) * (1 - Math.pow(t, 1.24)));
  });
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export default function Footer({
  gradientHeight = "40vh",
  minReveal = 0.045,
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
}) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef(null);
  const [progress, setProgress] = useState(minReveal);

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

  const colW = VBW / bars;

  return (
    <footer
      className="w-full overflow-x-clip font-body text-ink"
      style={{ paddingBottom: gradientHeight }}
    >
      <div className="w-full px-10 pt-12">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + newsletter */}
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

            <div className="mt-6 flex max-w-xs gap-2">
              <input
                type="email"
                aria-label="Email address"
                placeholder="you@company.com"
                className="h-9 w-full rounded-md border border-ink/15 bg-transparent px-3 text-sm placeholder:text-ink/50 focus:border-ink/40 focus:outline-none"
              />
              <button
                type="button"
                className="h-9 shrink-0 rounded-md bg-ink px-3 font-mono text-xs uppercase tracking-wider text-paper transition-opacity hover:opacity-90"
              >
                Join
              </button>
            </div>
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

          {/* Services (beside Company) */}
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
         <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-magenta" />
            UV Printing · Signage · Fabrication
          </span> <span>© {new Date().getFullYear()} Corp Prints | Website developed by KUEAUREX SOLUTIONS</span>
          
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
            <linearGradient id={`g-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {STOPS.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter id={`b-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {bellHeights(bars, peak, valley).map((h, i) => (
            <g key={i} filter={`url(#b-${uid})`}>
              <rect
                x={i * colW}
                y={VBH - h}
                width={colW * 1.23}
                height={h}
                fill={`url(#g-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}