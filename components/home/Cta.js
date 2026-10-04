import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-10 text-paper md:p-16">
          {/* four inks overlapping, like a misregistered print */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56"
          >
            <span className="absolute left-0 top-0 h-40 w-40 rounded-full bg-cyan mix-blend-screen" />
            <span className="absolute left-16 top-4 h-40 w-40 rounded-full bg-magenta mix-blend-screen" />
            <span className="absolute left-8 top-20 h-40 w-40 rounded-full bg-yellow mix-blend-screen" />
          </div>
          <h2 className="relative max-w-xl font-display text-3xl leading-tight tracking-tight md:text-5xl">
            Have something to print, build or light up?
          </h2>
          <p className="relative mt-4 max-w-md text-paper/70">
            Send us the details and we will come back with a plan, a price and a
            timeline.
          </p>
          <a
            href="/contact"
            className="relative mt-8 inline-block rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Start your project
          </a>
        </div>
      </Reveal>
    </section>
  );
}
