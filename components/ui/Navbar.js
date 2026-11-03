// "use client";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { CustomEase } from "gsap/CustomEase";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(CustomEase);
// }

// const LINKS = [
//   { label: "Home", href: "/" },
//   { label: "About Us", href: "/about-us" },
//   { label: "Services", href: "/services" },
//   { label: "Store", href: "/store" },
//   { label: "Gallery", href: "/gallery" },
//   { label: "Contact Us", href: "/contact" },
// ];

// // Five on-theme illustrations, one per link, recolored from the reference's
// // purple/indigo palette into Corp Prints' CMYK inks. Each "shape-element"
// // child is staggered in/out on hover, same as the original component.
// // Hidden below `sm` so touch phones never get a stuck illustration.
// function Shapes() {
//   return (
//     <div className="ambient-background-shapes pointer-events-none absolute inset-0 hidden sm:block">
//       {/* 0 — Home: floating circles */}
//       <svg className="bg-shape bg-shape-0 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         <circle className="shape-element" cx="90" cy="130" r="42" fill="#00AEEF" fillOpacity="0.25" />
//         <circle className="shape-element" cx="300" cy="90" r="62" fill="#EC008C" fillOpacity="0.18" />
//         <circle className="shape-element" cx="210" cy="300" r="80" fill="#FFF200" fillOpacity="0.3" />
//         <circle className="shape-element" cx="340" cy="270" r="30" fill="#14151A" fillOpacity="0.12" />
//       </svg>

//       {/* 1 — About Us: wave pattern */}
//       <svg className="bg-shape bg-shape-1 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         <path className="shape-element" d="M0 200 Q100 100 200 200 T400 200" stroke="#EC008C" strokeOpacity="0.3" strokeWidth="50" fill="none" />
//         <path className="shape-element" d="M0 280 Q100 180 200 280 T400 280" stroke="#00AEEF" strokeOpacity="0.22" strokeWidth="34" fill="none" />
//       </svg>

//       {/* 2 — Services: grid dots */}
//       <svg className="bg-shape bg-shape-2 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         {[60, 150, 240, 330].map((cx, ci) =>
//           [80, 180, 280].map((cy, cj) => (
//             <circle
//               key={`${ci}-${cj}`}
//               className="shape-element"
//               cx={cx}
//               cy={cy}
//               r={7 + ((ci + cj) % 3) * 2}
//               fill={["#00AEEF", "#EC008C", "#FFF200"][(ci + cj) % 3]}
//               fillOpacity="0.35"
//             />
//           ))
//         )}
//       </svg>

//       {/* 3 — Store: organic blobs */}
//       <svg className="bg-shape bg-shape-3 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         <path
//           className="shape-element"
//           d="M100 100 Q150 50 200 100 Q250 150 200 200 Q150 250 100 200 Q50 150 100 100"
//           fill="#00AEEF"
//           fillOpacity="0.22"
//         />
//         <path
//           className="shape-element"
//           d="M250 210 Q305 160 355 210 Q400 260 350 305 Q300 350 250 305 Q205 260 250 210"
//           fill="#EC008C"
//           fillOpacity="0.18"
//         />
//       </svg>

//       {/* 4 — Contact Us: diagonal lines */}
//       <svg className="bg-shape bg-shape-4 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="#14151A" strokeOpacity="0.15" strokeWidth="28" />
//         <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="#00AEEF" strokeOpacity="0.22" strokeWidth="22" />
//         <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="#FFF200" strokeOpacity="0.3" strokeWidth="18" />
//       </svg>
//             {/* 5 — Contact Us: concentric rings (a "signal" in CMYK) */}
//       <svg className="bg-shape bg-shape-5 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
//         <circle className="shape-element" cx="280" cy="200" r="150" stroke="#00AEEF" strokeOpacity="0.25" strokeWidth="26" fill="none" />
//         <circle className="shape-element" cx="280" cy="200" r="100" stroke="#EC008C" strokeOpacity="0.22" strokeWidth="22" fill="none" />
//         <circle className="shape-element" cx="280" cy="200" r="52" stroke="#FFF200" strokeOpacity="0.4" strokeWidth="18" fill="none" />
//         <circle className="shape-element" cx="280" cy="200" r="14" fill="#14151A" fillOpacity="0.2" />
//       </svg>
//     </div>
//   );
// }

// export default function Navbar() {
//   const rootRef = useRef(null);
//   const tlRef = useRef(null);
//   const [open, setOpen] = useState(false);

//   // Build the open/close timeline exactly once, paused, rather than
//   // rebuilding it on every click — see previous note: rebuilding it inside
//   // an effect keyed on `open` is what caused the animation to silently not
//   // play under React's dev-mode double-invoke.
//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       try {
//         if (!gsap.parseEase("main")) {
//           CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
//         }
//       } catch (e) {
//         // falls back to the tween-level ease below if CustomEase fails
//       }

//       const overlay = rootRef.current.querySelector(".nav-overlay-bg");
//       const panels = rootRef.current.querySelectorAll(".gate-panel");
//       const links = rootRef.current.querySelectorAll(".nav-link-el");
//       const iconTop = rootRef.current.querySelector(".menu-icon-top");
//       const iconBottom = rootRef.current.querySelector(".menu-icon-bottom");
//       const labelOpen = rootRef.current.querySelector(".menu-label-open");
//       const labelClose = rootRef.current.querySelector(".menu-label-close");

//       const ease = gsap.parseEase("main") ? "main" : "power4.out";
//       const tl = gsap.timeline({ paused: true, defaults: { ease, duration: 0.7 } });

//       tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0)
//         .fromTo(panels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1 }, 0)
//         .fromTo(
//           links,
//           { yPercent: 140, rotate: 8, autoAlpha: 0 },
//           { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6 },
//           0.3
//         )
//         .fromTo(labelOpen, { yPercent: 0 }, { yPercent: -100, duration: 0.4 }, 0)
//         .fromTo(labelClose, { yPercent: 100 }, { yPercent: 0, duration: 0.4 }, 0)
//         .fromTo(iconTop, { rotate: 0, y: 0 }, { rotate: 45, y: 4, duration: 0.4 }, 0)
//         .fromTo(iconBottom, { rotate: 0, y: 0 }, { rotate: -45, y: -4, duration: 0.4 }, 0);

//       tlRef.current = tl;
//     }, rootRef);

//     return () => {
//       ctx.revert();
//       tlRef.current = null;
//     };
//   }, []);

//   useEffect(() => {
//     if (!tlRef.current) return;
//     if (open) tlRef.current.play();
//     else tlRef.current.reverse();
//   }, [open]);

//   // Per-link hover: swap which ambient shape is "active" and stagger its
//   // elements in/out, matching the reference's onEnter/onLeave logic.
//   useEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       const items = rootRef.current.querySelectorAll(".menu-list-item[data-shape]");
//       const shapesContainer = rootRef.current.querySelector(".ambient-background-shapes");
//       const cleanups = [];

//       items.forEach((item) => {
//         const idx = item.getAttribute("data-shape");
//         const shape = shapesContainer?.querySelector(`.bg-shape-${idx}`);
//         if (!shape) return;
//         const els = shape.querySelectorAll(".shape-element");

//         const onEnter = () => {
//           shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
//           gsap.to(shape, { opacity: 1, duration: 0.2 });
//           shape.classList.add("active");
//           gsap.fromTo(
//             els,
//             { scale: 0.5, opacity: 0, rotation: -10, transformOrigin: "center" },
//             { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
//           );
//         };
//         const onLeave = () => {
//           gsap.to(els, {
//             scale: 0.8,
//             opacity: 0,
//             duration: 0.3,
//             ease: "power2.in",
//             overwrite: "auto",
//             onComplete: () => {
//               shape.classList.remove("active");
//               gsap.set(shape, { opacity: 0 });
//             },
//           });
//         };

//         item.addEventListener("mouseenter", onEnter);
//         item.addEventListener("mouseleave", onLeave);
//         cleanups.push(() => {
//           item.removeEventListener("mouseenter", onEnter);
//           item.removeEventListener("mouseleave", onLeave);
//         });
//       });

//       return () => cleanups.forEach((fn) => fn());
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   // Lock page scroll while the gate is open.
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   // Close on Escape.
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <div ref={rootRef}>
//       <header className="fixed inset-x-0 top-0 z-50">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
//           <a href="/" className="font-display text-sm font-bold uppercase tracking-[0.15em] text-ink md:text-base">
//             Corp<span className="text-magenta">.</span>Prints
//           </a>

//           <button
//             type="button"
//             onClick={() => setOpen((o) => !o)}
//             aria-expanded={open}
//             aria-controls="kinetic-gate-menu"
//             aria-label="Toggle navigation menu"
//             className="flex items-center gap-3 rounded-full border border-ink/15 bg-white/70 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-ink/30"
//           >
//             <span className="relative block h-[1em] w-14 overflow-hidden font-display text-xs uppercase tracking-[0.2em] text-ink">
//               <span className="menu-label-open block">Menu</span>
//               <span className="menu-label-close absolute inset-0 block">Close</span>
//             </span>
//             <span className="relative block h-3 w-4 shrink-0">
//               <span className="menu-icon-top absolute inset-x-0 top-0 h-[1.5px] origin-center bg-ink" />
//               <span className="menu-icon-bottom absolute inset-x-0 bottom-0 h-[1.5px] origin-center bg-ink" />
//             </span>
//           </button>
//         </div>
//       </header>

//       <div
//         id="kinetic-gate-menu"
//         className={`gate-root fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
//         aria-hidden={!open}
//       >
//         <div className="nav-overlay-bg absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

//         <div className="absolute inset-y-0 right-0 w-full max-w-xl overflow-hidden">
//           <div className="gate-panel absolute inset-0 bg-ink rounded-l-3xl" />
//           <div className="gate-panel absolute inset-0 bg-cyan rounded-l-3xl" />
//           <div className="gate-panel absolute inset-0 bg-paper rounded-l-3xl" />

//           {/* the ambient shape for whichever link is hovered sits behind
//               the link list, inside the same panel */}
//           <Shapes />

//           <nav className="relative z-10 flex h-full w-full flex-col justify-center overflow-hidden px-8 md:px-16">
//             <ul className="flex flex-col gap-1">
//               {LINKS.map((l, i) => (
//                 <li key={l.label} data-shape={i} className="menu-list-item group relative overflow-hidden">
//                   {/* the dark bar that wipes in behind the hovered row,
//                       inverting the text to paper-white on top of it */}
//                   <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.65,.01,.05,.99)] group-hover:scale-x-100" />
//                   <a
//                     href={l.href}
//                     onClick={() => setOpen(false)}
//                     className="nav-link-el relative block py-2 font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink transition-colors duration-300 group-hover:text-paper md:py-3"
//                   >
//                     <span className="flex items-baseline gap-4">
//                       {/* <span className="text-xs font-normal tracking-widest text-ink/30 transition-colors duration-300 group-hover:text-paper/50">
//                         0{i + 1}
//                       </span> */}
//                       {l.label}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ───────────────────────── Content ───────────────────────── */

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Store", href: "/store" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

// Uses photos you already have in /public/gallery. Swap for any two you prefer.
const IMAGES = [
  { src: "/gallery/1.jpg", alt: "Flex and vinyl printing" },
  { src: "/gallery/3.jpg", alt: "Illuminated signage" },
];

// Placeholder links: point these at the real profiles.
const SOCIALS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
];

const TAGLINE = "Visual branding & structural fabrication.";
const LOCATION = "Hyderabad, Telangana";

const CMYK = ["#00B8D9", "#E8368F", "#FFC400", "#14151A"];
const DOT_BG = ["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"];
const HOVER = ["#00B8D9", "#E8368F"]; // colour revealed by the letter-roll hover

/* ───────────────────────── Motion ───────────────────────── */

const OPEN_S = 1.2;
const CLOSE_S = 1.1;
const EASE = "power4.inOut";
const CONTENT_DELAY = 0.9; // when the links/images start revealing

// The panel opens RIGHT → LEFT: it starts as a sliver on the right edge and
// grows toward the left. Closing retraces the same path back to the right.
const CLIP = {
  closed: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
};

const pad = (n) => String(n).padStart(2, "0");

const BLUEPRINT = {
  // backgroundImage:
  //   "linear-gradient(rgba(20,21,26,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,21,26,.05) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  // WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent)",
  // maskImage: "linear-gradient(to bottom, #000 30%, transparent)",
};
const HALFTONE = {
  // backgroundImage: "radial-gradient(currentColor 1.3px, transparent 1.7px)",
  backgroundSize: "14px 14px",
  // WebkitMaskImage: "linear-gradient(135deg, transparent 35%, #000 100%)",
  // maskImage: "linear-gradient(135deg, transparent 35%, #000 100%)",
};

/* ───────────────────────── Focus trap ─────────────────────────
   Keeps Tab inside the menu while open, closes on Escape, and gives focus
   back to the toggle button afterwards. */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isVisible = (el) => {
  if (!el || el.hidden) return false;
  const s = window.getComputedStyle(el);
  if (s.visibility === "hidden" || s.visibility === "collapse") return false;
  return el.getClientRects().length > 0;
};
const getFocusable = (container) =>
  container ? Array.from(container.querySelectorAll(FOCUSABLE)).filter(isVisible) : [];

function useFocusTrap({ active, containerRef, initialFocusRef, onEscape }) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? getFocusable(container)[0];
      target?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable(container);
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey) {
        if (current === first || !container.contains(current)) {
          e.preventDefault();
          last.focus();
        }
      } else if (current === last || !container.contains(current)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}

/* ───────────────────────── Small pieces ───────────────────────── */

// Each letter rolls up and a copy in the hover colour rolls in underneath it.
function NavLinkHover({ label, href, hoverColor, active, reduced, onClick }) {
  const common = {
    href,
    onClick,
    "aria-current": active ? "page" : undefined,
  };

  if (reduced) {
    return (
      <Link {...common} className="inline-block">
        {label}
      </Link>
    );
  }

  return (
    <Link {...common} className="group/link inline-block no-underline">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="relative inline-block overflow-hidden align-middle leading-[1.15]">
        {[...label].map((char, i) => (
          <span
            key={i}
            className="relative inline-block whitespace-pre transition-transform duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] group-hover/link:-translate-y-[1.25em] group-focus-visible/link:-translate-y-[1.25em]"
            style={{ textShadow: `0 1.25em ${hoverColor}`, transitionDelay: `${i * 0.015}s` }}
          >
            {char}
          </span>
        ))}
      </span>
    </Link>
  );
}

function SocialIcon({ name }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5",
    "aria-hidden": true,
  };
  if (name === "instagram")
    return (
      <svg {...p}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    );
  if (name === "facebook")
    return (
      <svg {...p}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ───────────────────────── Navbar ───────────────────────── */

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rootRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const tlRef = useRef(null);
  const openRef = useRef(false);
  const busyRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedRef.current = mq.matches;
      setReduced(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    busyRef.current = true;
    setOpen(true);
    tlRef.current?.kill();

    const overlay = overlayRef.current;
    gsap.set(overlay, { visibility: "visible", clipPath: CLIP.closed });
    gsap.set(panelRef.current, { scale: 1, opacity: 1 });

    const done = () => {
      busyRef.current = false;
    };

    if (reducedRef.current) {
      gsap.set(overlay, { clipPath: CLIP.open, autoAlpha: 0 });
      tlRef.current = gsap.to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out", onComplete: done });
      return;
    }
    tlRef.current = gsap.to(overlay, {
      clipPath: CLIP.open,
      duration: OPEN_S,
      delay: 0.2,
      ease: EASE,
      onComplete: done,
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    busyRef.current = true;
    setOpen(false);
    tlRef.current?.kill();

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const finish = () => {
      busyRef.current = false;
      gsap.set(overlay, { clipPath: CLIP.closed, visibility: "hidden" });
      gsap.set(panel, { scale: 1, opacity: 1 });
    };

    if (reducedRef.current) {
      tlRef.current = gsap.to(overlay, { autoAlpha: 0, duration: 0.2, ease: "power2.out", onComplete: finish });
      return;
    }
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(panel, { scale: 0.92, opacity: 0.5, duration: 0.7, ease: "power2.in" }).to(
      overlay,
      { clipPath: CLIP.closed, duration: CLOSE_S, ease: EASE },
      "<"
    );
    tlRef.current = tl;
  }, []);

  const toggle = () => {
    if (busyRef.current) return;
    if (openRef.current) closeMenu();
    else openMenu();
  };

  // Reveal the panel's content after the wipe has mostly opened
  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !open || reduced) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ delay: CONTENT_DELAY, defaults: { ease: "power3.out" } });
      tl.fromTo(q('[data-nv="meta"]'), { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0)
        .fromTo(q('[data-nv="link"]'), { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0)
        .fromTo(q('[data-nv="img"]'), { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.1)
        .fromTo(q('[data-nv="foot"]'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.25);
    }, el);

    return () => ctx.revert();
  }, [open, reduced]);

  // Lock page scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useFocusTrap({ active: open, containerRef: rootRef, initialFocusRef: toggleRef, onEscape: closeMenu });

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <div ref={rootRef}>
      {/* header: stays on top so the toggle can close the menu */}
      <header className="fixed inset-x-0 top-0 z-[56]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="font-display text-sm font-bold uppercase tracking-[0.15em] text-ink md:text-base">
            Corp<span className="text-magenta">.</span>Prints
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 bg-white/80 backdrop-blur-md transition-colors hover:border-ink/30"
          >
            <span className={`block h-[2px] w-5 rounded bg-ink transition-all duration-500 ease-in-out motion-reduce:transition-none ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-5 rounded bg-ink transition-all duration-300 motion-reduce:transition-none ${open ? "scale-x-0 opacity-0" : ""}`} />
            <span className={`block h-[2px] w-5 rounded bg-ink transition-all duration-500 ease-in-out motion-reduce:transition-none ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* full-screen panel */}
      <nav
        id="site-menu"
        ref={overlayRef}
        aria-label="Main"
        aria-hidden={!open}
        style={{ clipPath: CLIP.closed, visibility: "hidden" }}
        className={`fixed inset-0 z-[55] overflow-y-auto bg-paper ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div ref={panelRef} className="relative min-h-[100svh] w-full">
          {/* decoration */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[34rem]" style={BLUEPRINT} />
            <div className="absolute bottom-0 right-0 h-[55%] w-[50%] text-ink opacity-[0.08]" style={HALFTONE} />
            {/* CMYK bar on the leading (left) edge */}
            <div className="absolute inset-y-0 left-0 flex w-1.5 flex-col">
              {CMYK.map((c) => (
                <span key={c} className="flex-1" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-between gap-8 px-6 pb-8 pt-28 md:px-10">
            {/* top: eyebrow + tagline */}
            <div className="flex flex-col gap-1">
              <p data-nv="meta" className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">
                Corp Prints <span className="text-ink/30">/</span> Menu
              </p>
              <p data-nv="meta" className="text-sm text-ink/60">
                {TAGLINE}
              </p>
            </div>

            {/* middle: links + images */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <ul className="flex flex-col">
                {LINKS.map((l, i) => (
                  <li key={l.label} data-nv="link" className="flex items-baseline gap-3 sm:gap-4">
                    <span className="flex w-9 shrink-0 items-center gap-1.5 font-mono text-[11px] text-ink/40">
                      <i className={`h-1.5 w-1.5 rounded-full ${DOT_BG[i % 4]} ${isActive(l.href) ? "" : "opacity-40"}`} />
                      {/* {pad(i + 1)} */}
                    </span>
                    <span className="font-display text-[clamp(2rem,min(11vw,7.5vh),4rem)] font-bold leading-none tracking-tight text-ink lg:text-[clamp(2.4rem,min(6.2vw,9.5vh),5.5rem)]">
                      <NavLinkHover
                        label={l.label}
                        href={l.href}
                        hoverColor={HOVER[i % 2]}
                        active={isActive(l.href)}
                        reduced={reduced}
                        onClick={closeMenu}
                      />
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 lg:gap-5">
                {IMAGES.map((img, i) => (
                  <div
                    key={img.src}
                    data-nv="img"
                    className="relative h-[16vh] flex-1 overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 lg:h-[min(42vh,28vw)] lg:w-[min(33.6vh,22.4vw)] lg:flex-none"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      draggable={false}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                    />
                    {/* CMYK tint */}
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/15 via-transparent to-magenta/15 mix-blend-multiply" />
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/60 bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink backdrop-blur">
                      <i className={`h-1.5 w-1.5 rounded-full ${DOT_BG[i % 4]}`} />
                      Fig. {pad(i + 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom: socials, location, quote button */}
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    data-nv="foot"
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span data-nv="foot" className="flex items-center gap-2 text-sm text-ink/60">
                  <span className="flex gap-0.5">
                    <i className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    <i className="h-1.5 w-1.5 rounded-full bg-magenta" />
                    <i className="h-1.5 w-1.5 rounded-full bg-yellow" />
                  </span>
                  {LOCATION}
                </span>
                <Link
                  data-nv="foot"
                  href="/contact"
                  onClick={closeMenu}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:scale-[1.03]"
                >
                  Get a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}