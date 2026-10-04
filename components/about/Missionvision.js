
"use client";
import Image from "next/image";
import bg from "./mission-vision-bg.png";

const RULE = (reverse) => {
  const colors = ["#00AEEF", "#EC008C", "#FFF200", "#14151A"];
  return reverse ? [...colors].reverse() : colors;
};

function Statement({ index, label, text }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-ink/50">
          {label}
        </p>
        <span className="font-mono text-[11px] text-ink/30">{index}</span>
      </div>
      <div className="mt-3 flex h-[3px] w-14 overflow-hidden rounded-full">
        {RULE(label === "Vision").map((c) => (
          <span key={c} className="h-full flex-1" style={{ background: c }} />
        ))}
      </div>
      <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
        {text}
      </p>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-paper">
      <div
        className="relative overflow-hidden rounded-lg "
        style={{ width: "96vw", height: "96vh" }}
      >
        <Image
          src={bg}
          alt="Corp Prints showroom"
          fill
          priority
          sizes="96vw"
          className="object-cover"
        />

        {/* scrim behind the whole left column, since everything now lives there */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent md:w-3/5" />

        <div className="relative z-10 flex h-full flex-col justify-end gap-8 p-6 md:p-14">
          <div className="flex max-w-xl flex-col gap-8">
            {/* headline over the photo */}
            <div className="text-paper">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-paper/60">
                Who We Are
              </p>
              <h2 className="mt-1 font-display text-2xl leading-tight tracking-tight ">
                What we work toward, and why.
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-paper/70 md:text-base">
                Two statements that guide every project, from a single sign to a
                full installation.
              </p>
            </div>

            {/* white card, now stacked under the headline on the same side */}
            <div className="rounded-2xl border border-white/40 bg-paper/95 p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-9">
              <div className="space-y-7">
                <Statement
                  label="Mission"
                  text="To bridge creative design with advanced fabrication technology, delivering durable, high-impact visual communication assets for corporate, retail and event clientele."
                />
                <div className="h-px w-full bg-ink/10" />
                <Statement
                  label="Vision"
                  text="To be the first call for visual branding and fabrication — where every printed, lit, or built surface carries a brand's identity without compromise."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
