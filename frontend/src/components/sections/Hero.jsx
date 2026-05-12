import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";

export default function Hero() {
  const onViewProjects = () =>
    track(Events.HERO_VIEW_PROJECTS, { source: "hero" });

  return (
    <section
      data-testid="hero-section"
      className="relative pt-14 md:pt-24 pb-20 md:pb-32 overflow-hidden"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-7 md:mb-10 reveal">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
            </span>
            <span className="overline text-foreground/80">AVAILABLE FOR SUMMER 2026 INTERNSHIPS</span>
          </div>

          <h1 data-testid="hero-headline" className="h-display reveal">
            Marketing with structure,
            <br />
            <span className="italic text-terracotta">curiosity, and intent.</span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-7 md:mt-9 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed reveal"
            style={{ transitionDelay: "120ms" }}
          >
            I'm Ahmed Mohsen Mostafa, a marketing student in Brussels building my path through research, campaigns, and hands-on strategic work.
          </p>
          <p
            className="mt-3 max-w-2xl text-sm text-foreground/60 leading-relaxed reveal"
            style={{ transitionDelay: "140ms" }}
          >
            Drawn to work that starts with clarity, stays curious, and leads to something genuinely useful.
          </p>

          <div
            className="mt-9 md:mt-11 flex flex-wrap items-center gap-3 sm:gap-4 reveal"
            style={{ transitionDelay: "220ms" }}
          >
            <Link
              to="/projects"
              onClick={onViewProjects}
              data-testid="hero-cta-projects"
              className="btn-primary group"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <CVButton variant="ghost" source="hero" testId="hero-cta-cv" />
          </div>
        </div>

          <div className="lg:col-span-4 reveal" style={{ transitionDelay: "300ms" }}>
            <div className="space-y-4">
              <section aria-label="Quick profile snapshot" className="border border-hairline bg-surface/70 p-4 md:p-5">
                <div className="space-y-4">
                  <div>
                    <p className="overline text-xs mb-2 text-terracotta font-semibold">AVAILABLE NOW</p>
                    <p className="text-sm font-medium text-foreground">Summer 2026 Internships</p>
                  </div>
                  <div className="border-t border-hairline/50 pt-3">
                    <p className="overline text-xs mb-1 text-foreground/60">EDUCATION</p>
                    <p className="text-sm text-foreground/80 leading-snug">Odisee — Business Management & Marketing</p>
                  </div>
                  <div className="border-t border-hairline/50 pt-3">
                    <p className="overline text-xs mb-1 text-foreground/60">LOOKING FOR</p>
                    <p className="text-sm text-foreground/80 leading-snug">Marketing, research, or analytics roles</p>
                  </div>
                  <div className="border-t border-hairline/50 pt-3">
                    <p className="overline text-xs mb-1 text-foreground/60">STRENGTH</p>
                    <p className="text-sm text-foreground/80 leading-snug">Research-led strategy + execution</p>
                  </div>
                </div>
              </section>

              <div className="flex items-center gap-2 text-xs text-subtle">
                <MapPin size={13} aria-hidden="true" /> Brussels — Open across Belgium & Europe
              </div>
            </div>
          </div>
      </div>

      <div className="container-editorial mt-16 md:mt-24 hidden md:flex items-center gap-4 text-subtle">
        <span className="h-px w-16 bg-hairline" aria-hidden="true" />
        <span className="overline">Scroll — recruiter snapshot below</span>
      </div>
    </section>
  );
}
