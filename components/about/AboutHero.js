"use client";
import Reveal from "../home/Reveal";
import GlitchText from "@/components/ui/Glitchtext";

const PILLARS = [
  { c: "bg-cyan", t: "Design", d: "Artwork and layouts prepared for the material they will be produced on." },
  { c: "bg-magenta", t: "Fabricate", d: "UV, vinyl, flex, laser and CNC work under one roof." },
  { c: "bg-yellow", t: "Install", d: "Facades, hoardings, arches and lighting, fitted and finished." },
];

export default function AboutHero() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        {/* The box is drawn to wrap whatever content sits inside it, so
            the copy is always exactly within its walls — a fixed photo
            can't do that once the content's height changes per screen
            size, which is what was cropping/zooming oddly before. */}
        <div className="relative isolate">
          {/* the light fixture above the box, and the seam it casts along
              the top edge */}
          <div className="pointer-events-none absolute inset-x-10 -top-4 h-8 rounded-full bg-white/90 blur-2xl md:inset-x-20" />

          <div
            className="relative overflow-hidden rounded-[10px] border border-white/70 bg-white/25 backdrop-blur-xl md:rounded-[14px]"
            style={{ boxShadow: "0 40px 90px -40px rgba(20,21,26,.35), inset 0 0 0 1px rgba(255,255,255,.5)" }}
          >
            {/* visible glass edges: brighter, slightly thicker posts at
                each side, the way bonded acrylic panels catch light along
                their seams in the reference photo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-white/90" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-white/70" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-white/60" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-white/60" />

            {/* light spilling down from the top rim */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/60 via-white/10 to-transparent" />

            {/* faint colour catching the inside corners */}
            <div className="pointer-events-none absolute -left-8 top-0 h-36 w-36 rounded-full bg-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-magenta/15 blur-3xl" />

            <div className="relative p-8 md:p-14">
              <div className="grid gap-12 md:grid-cols-2 md:gap-16">
                <GlitchText
                  as="h2"
                  burstMs={900}
                  className="font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl"
                >
                  Creative design, joined to fabrication technology.
                </GlitchText>
                <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                  Corp Prints is a visual branding and structural fabrication firm. We make durable,
                  high-impact visual communication for corporate, retail and event clients, from
                  white-ink UV printing and illuminated signage to architectural displays and structural lighting.
                </p>
              </div>

              <div className="mt-14 grid gap-4 md:grid-cols-3">
                {PILLARS.map((p) => (
                  <div key={p.t} className="h-full rounded-2xl border border-white/50 bg-white/55 p-7 backdrop-blur-sm">
                    <span className={`block h-3 w-3 rounded-full ${p.c} mix-blend-multiply`} />
                    <h3 className="mt-6 font-display text-xl text-ink">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* the reflection under the box, fading out, as in the reference photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-full h-20 opacity-25 md:h-28"
            style={{
              transform: "scaleY(-1)",
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          >
            <div className="h-full w-full rounded-[14px] bg-gradient-to-b from-white/60 via-white/15 to-transparent blur-[2px]" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}