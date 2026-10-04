
"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Store", href: "/store" },
  { label: "Contact Us", href: "/contact" },
];

// Five on-theme illustrations, one per link, recolored from the reference's
// purple/indigo palette into Corp Prints' CMYK inks. Each "shape-element"
// child is staggered in/out on hover, same as the original component.
function Shapes() {
  return (
    <div className="ambient-background-shapes pointer-events-none absolute inset-0">
      {/* 0 — Home: floating circles */}
      <svg className="bg-shape bg-shape-0 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <circle className="shape-element" cx="90" cy="130" r="42" fill="#00AEEF" fillOpacity="0.25" />
        <circle className="shape-element" cx="300" cy="90" r="62" fill="#EC008C" fillOpacity="0.18" />
        <circle className="shape-element" cx="210" cy="300" r="80" fill="#FFF200" fillOpacity="0.3" />
        <circle className="shape-element" cx="340" cy="270" r="30" fill="#14151A" fillOpacity="0.12" />
      </svg>

      {/* 1 — About Us: wave pattern */}
      <svg className="bg-shape bg-shape-1 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <path className="shape-element" d="M0 200 Q100 100 200 200 T400 200" stroke="#EC008C" strokeOpacity="0.3" strokeWidth="50" fill="none" />
        <path className="shape-element" d="M0 280 Q100 180 200 280 T400 280" stroke="#00AEEF" strokeOpacity="0.22" strokeWidth="34" fill="none" />
      </svg>

      {/* 2 — Services: grid dots */}
      <svg className="bg-shape bg-shape-2 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {[60, 150, 240, 330].map((cx, ci) =>
          [80, 180, 280].map((cy, cj) => (
            <circle
              key={`${ci}-${cj}`}
              className="shape-element"
              cx={cx}
              cy={cy}
              r={7 + ((ci + cj) % 3) * 2}
              fill={["#00AEEF", "#EC008C", "#FFF200"][(ci + cj) % 3]}
              fillOpacity="0.35"
            />
          ))
        )}
      </svg>

      {/* 3 — Store: organic blobs */}
      <svg className="bg-shape bg-shape-3 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <path
          className="shape-element"
          d="M100 100 Q150 50 200 100 Q250 150 200 200 Q150 250 100 200 Q50 150 100 100"
          fill="#00AEEF"
          fillOpacity="0.22"
        />
        <path
          className="shape-element"
          d="M250 210 Q305 160 355 210 Q400 260 350 305 Q300 350 250 305 Q205 260 250 210"
          fill="#EC008C"
          fillOpacity="0.18"
        />
      </svg>

      {/* 4 — Contact Us: diagonal lines */}
      <svg className="bg-shape bg-shape-4 absolute inset-0 h-full w-full opacity-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="#14151A" strokeOpacity="0.15" strokeWidth="28" />
        <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="#00AEEF" strokeOpacity="0.22" strokeWidth="22" />
        <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="#FFF200" strokeOpacity="0.3" strokeWidth="18" />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const rootRef = useRef(null);
  const tlRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Build the open/close timeline exactly once, paused, rather than
  // rebuilding it on every click — see previous note: rebuilding it inside
  // an effect keyed on `open` is what caused the animation to silently not
  // play under React's dev-mode double-invoke.
  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      try {
        if (!gsap.parseEase("main")) {
          CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        }
      } catch (e) {
        // falls back to the tween-level ease below if CustomEase fails
      }

      const overlay = rootRef.current.querySelector(".nav-overlay-bg");
      const panels = rootRef.current.querySelectorAll(".gate-panel");
      const links = rootRef.current.querySelectorAll(".nav-link-el");
      const iconTop = rootRef.current.querySelector(".menu-icon-top");
      const iconBottom = rootRef.current.querySelector(".menu-icon-bottom");
      const labelOpen = rootRef.current.querySelector(".menu-label-open");
      const labelClose = rootRef.current.querySelector(".menu-label-close");

      const ease = gsap.parseEase("main") ? "main" : "power4.out";
      const tl = gsap.timeline({ paused: true, defaults: { ease, duration: 0.7 } });

      tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 0)
        .fromTo(panels, { xPercent: 101 }, { xPercent: 0, stagger: 0.1 }, 0)
        .fromTo(
          links,
          { yPercent: 140, rotate: 8, autoAlpha: 0 },
          { yPercent: 0, rotate: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6 },
          0.3
        )
        .fromTo(labelOpen, { yPercent: 0 }, { yPercent: -100, duration: 0.4 }, 0)
        .fromTo(labelClose, { yPercent: 100 }, { yPercent: 0, duration: 0.4 }, 0)
        .fromTo(iconTop, { rotate: 0, y: 0 }, { rotate: 45, y: 4, duration: 0.4 }, 0)
        .fromTo(iconBottom, { rotate: 0, y: 0 }, { rotate: -45, y: -4, duration: 0.4 }, 0);

      tlRef.current = tl;
    }, rootRef);

    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (open) tlRef.current.play();
    else tlRef.current.reverse();
  }, [open]);

  // Per-link hover: swap which ambient shape is "active" and stagger its
  // elements in/out, matching the reference's onEnter/onLeave logic.
  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const items = rootRef.current.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = rootRef.current.querySelector(".ambient-background-shapes");
      const cleanups = [];

      items.forEach((item) => {
        const idx = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(`.bg-shape-${idx}`);
        if (!shape) return;
        const els = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          gsap.to(shape, { opacity: 1, duration: 0.2 });
          shape.classList.add("active");
          gsap.fromTo(
            els,
            { scale: 0.5, opacity: 0, rotation: -10, transformOrigin: "center" },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };
        const onLeave = () => {
          gsap.to(els, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
            onComplete: () => {
              shape.classList.remove("active");
              gsap.set(shape, { opacity: 0 });
            },
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Lock page scroll while the gate is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={rootRef}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="/" className="font-display text-sm font-bold uppercase tracking-[0.15em] text-ink md:text-base">
            Corp<span className="text-magenta">.</span>Prints
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="kinetic-gate-menu"
            aria-label="Toggle navigation menu"
            className="flex items-center gap-3 rounded-full border border-ink/15 bg-white/70 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-ink/30"
          >
            <span className="relative block h-[1em] w-14 overflow-hidden font-display text-xs uppercase tracking-[0.2em] text-ink">
              <span className="menu-label-open block">Menu</span>
              <span className="menu-label-close absolute inset-0 block">Close</span>
            </span>
            <span className="relative block h-3 w-4 shrink-0">
              <span className="menu-icon-top absolute inset-x-0 top-0 h-[1.5px] origin-center bg-ink" />
              <span className="menu-icon-bottom absolute inset-x-0 bottom-0 h-[1.5px] origin-center bg-ink" />
            </span>
          </button>
        </div>
      </header>

      <div
        id="kinetic-gate-menu"
        className={`gate-root fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="nav-overlay-bg absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

        <div className="absolute inset-y-0 right-0 w-full max-w-xl overflow-hidden">
          <div className="gate-panel absolute inset-0 bg-ink" />
          <div className="gate-panel absolute inset-0 bg-cyan" />
          <div className="gate-panel absolute inset-0 bg-paper" />

          {/* the ambient shape for whichever link is hovered sits behind
              the link list, inside the same panel */}
          <Shapes />

          <nav className="relative z-10 flex h-full w-full flex-col justify-center overflow-hidden px-8 md:px-16">
            <ul className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <li key={l.label} data-shape={i} className="menu-list-item group relative overflow-hidden">
                  {/* the dark bar that wipes in behind the hovered row,
                      inverting the text to paper-white on top of it */}
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.65,.01,.05,.99)] group-hover:scale-x-100" />
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="nav-link-el relative block py-2 font-display text-[clamp(2rem,7vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-ink transition-colors duration-300 group-hover:text-paper md:py-3"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-normal tracking-widest text-ink/30 transition-colors duration-300 group-hover:text-paper/50">
                        0{i + 1}
                      </span>
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}