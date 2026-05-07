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
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-7 md:mb-10 reveal">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
            </span>
            <span className="overline text-foreground/80">
              {profile.status}
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            className="h-display reveal"
          >
            Marketing intern with a
            <br />
            <span className="italic text-terracotta">systems mind.</span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-7 md:mt-9 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed reveal"
            style={{ transitionDelay: "120ms" }}
          >
            BBA candidate at Odisee, Brussels. I bring an unusual mix to a
            marketing team — research instinct, analytics fluency, and an
            operations background that makes campaigns actually ship.
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

        <div
          className="lg:col-span-4 reveal"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="border-l border-hairline pl-6 md:pl-8 space-y-7">
            <div>
              <p className="overline mb-2">Currently</p>
              <p className="font-serif text-xl leading-snug">
                Studying Business Management & Marketing at Odisee, Brussels.
              </p>
            </div>
            <div>
              <p className="overline mb-2">Looking for</p>
              <p className="font-serif text-xl leading-snug">
                A marketing, growth, research or analytics internship —
                Summer 2026.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-subtle">
              <MapPin size={14} aria-hidden="true" /> Brussels — open across Belgium / Europe
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
