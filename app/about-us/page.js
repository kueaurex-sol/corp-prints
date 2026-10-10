import GlitchText from "@/components/ui/Glitchtext";
import MissionVision from "@/components/about/Missionvision";
import BrandJourney from "@/components/about/Brandjourneyparallax";
import BrandJourneyScrollStory from "@/components/about/Brandjourneyscrollstory";
import AboutGallery from "@/components/about/Aboutgallery";
import Cta from "@/components/home/Cta";

export const metadata = { title: "About Us | Corp Prints" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper">
      {/* top padding clears the fixed navbar */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-36 md:pt-44">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-ink/50">
          Corp Prints
        </p>
        <GlitchText
          as="h1"
          burstMs={900}
          className="mt-4 font-display text-[clamp(2.6rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight text-ink"
        >
          About Us
        </GlitchText>
        <div className="mt-6 flex h-1 w-40 overflow-hidden rounded-full">
          {["bg-cyan", "bg-magenta", "bg-yellow", "bg-ink"].map((c) => (
            <span key={c} className={`h-full flex-1 ${c}`} />
          ))}
        </div>
      </section>
      <MissionVision />
      {/* <BrandJourney /> */}
      <BrandJourneyScrollStory />
      {/* <AboutGallery /> */}
      {/* <Cta /> */}
    </main>
  );
}
