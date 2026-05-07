import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-8 reveal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
            </span>
            <span className="overline text-foreground/70">
              {profile.status}
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-serif font-light text-[2.6rem] sm:text-6xl md:text-7xl lg:text-[5.6rem] leading-[1.02] tracking-tight reveal"
          >
            Marketing intern with a
            <br />
            <span className="italic text-terracotta">systems mind.</span>
          </h1>

          <p
            data-testid="hero-subheadline"
            className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed reveal"
            style={{ transitionDelay: "120ms" }}
          >
            BBA candidate at Odisee, Brussels. I bring an unusual mix to a
            marketing team — research instinct, analytics fluency, and an
            operations background that makes campaigns actually ship.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 reveal"
            style={{ transitionDelay: "220ms" }}
          >
            <Link
              to="/projects"
              data-testid="hero-cta-projects"
              className="btn-primary group"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              href={profile.cvUrl}
              data-testid="hero-cta-cv"
              className="btn-ghost"
            >
              <Download size={14} /> Download CV
            </a>
          </div>
        </div>

        <div
          className="lg:col-span-4 reveal"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="border-l border-hairline pl-6 md:pl-8 space-y-6">
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
              <MapPin size={14} /> Brussels — open across Belgium / Europe
            </div>
          </div>
        </div>
      </div>

      {/* Editorial scroll cue */}
      <div className="container-editorial mt-20 hidden md:flex items-center gap-4 text-subtle">
        <span className="h-px w-16 bg-hairline" />
        <span className="overline">Scroll — recruiter snapshot below</span>
      </div>
    </section>
  );
}
