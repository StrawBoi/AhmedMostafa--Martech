import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";
import { LampContainer } from "@/components/ui/lamp";

const fadeUp = (reducedMotion, delay = 0.3) =>
  reducedMotion
    ? {}
    : {
        initial: { opacity: 0.5, y: 80 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay, duration: 0.8, ease: [0.42, 0, 0.58, 1] },
      };

export default function Hero() {
  const reducedMotion = useReducedMotion();

  const onViewProjects = () =>
    track(Events.HERO_VIEW_PROJECTS, { source: "hero" });

  return (
    <section data-testid="hero-section" className="relative w-full">
      <LampContainer>
        <motion.p
          {...fadeUp(reducedMotion, 0.15)}
          data-hero-wordmark
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2F0EA]/55"
        >
          {profile.name}
        </motion.p>

        <motion.div
          {...fadeUp(reducedMotion, 0.2)}
          data-hero-status
          className="mt-5 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2F0EA]/70">
            {profile.status}
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(reducedMotion, 0.3)}
          data-testid="hero-headline"
          className="mt-8 text-center font-serif font-light tracking-tight leading-[1.02] text-[clamp(2.5rem,7vw,5.5rem)]"
        >
          <span className="block bg-gradient-to-br from-[#F7F5EC] via-[#E8E4D8] to-[#9C9890] bg-clip-text text-transparent">
            Marketing with structure,
          </span>
          <span className="mt-1 block italic text-terracotta">
            curiosity, and intent.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(reducedMotion, 0.42)}
          data-testid="hero-subheadline"
          className="mt-7 max-w-2xl text-center text-base md:text-lg leading-relaxed text-[#F2F0EA]/75"
        >
          I'm Ahmed Mohsen Mostafa, a marketing student in Brussels building my path through research, campaigns, and hands-on strategic work.
        </motion.p>

        <motion.p
          {...fadeUp(reducedMotion, 0.48)}
          className="mt-3 max-w-xl text-center text-sm leading-relaxed text-[#F2F0EA]/50"
        >
          Drawn to work that starts with clarity, stays curious, and leads to something genuinely useful.
        </motion.p>

        <motion.div
          {...fadeUp(reducedMotion, 0.55)}
          data-hero-ctas
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
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
          <CVButton
            variant="inverted"
            source="hero"
            testId="hero-cta-cv"
            className="!min-h-[48px] !px-6 !py-3.5 text-sm"
          />
        </motion.div>

        <motion.div
          {...fadeUp(reducedMotion, 0.62)}
          data-hero-snapshot
          className="mt-10 grid w-full max-w-2xl grid-cols-2 gap-px border border-[#F2F0EA]/10 bg-[#F2F0EA]/10 text-left sm:grid-cols-4"
        >
          {[
            { label: "Location", value: "Brussels, BE" },
            { label: "Focus", value: "Research-led" },
            { label: "Education", value: "Odisee BBA" },
            { label: "Open to", value: "EU internships" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#0B0A09]/90 px-4 py-3 backdrop-blur-sm"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-terracotta/80">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-[#F2F0EA]/85">{item.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(reducedMotion, 0.7)}
          data-hero-scroll-cue
          className="mt-12 flex items-center gap-3 text-[#F2F0EA]/40"
        >
          <MapPin size={13} aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Scroll — signal below
          </span>
        </motion.div>
      </LampContainer>
    </section>
  );
}
