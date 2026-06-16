import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/motion/gsap";
import SplitLines from "@/components/motion/SplitLines";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function Hero() {
  const onViewProjects = () =>
    track(Events.HERO_VIEW_PROJECTS, { source: "hero" });

  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();

    const grain = root.querySelector("[data-hero-grain]");
    const scan = root.querySelector("[data-hero-scan]");
    const wordmark = root.querySelector("[data-hero-wordmark]");
    const status = root.querySelector("[data-hero-status]");
    const lineInners = root.querySelectorAll("[data-split-line-inner]");
    const accent = root.querySelector("[data-hero-accent]");
    const subs = root.querySelectorAll("[data-hero-sub]");
    const ctas = root.querySelector("[data-hero-ctas]");
    const snapshot = root.querySelector("[data-hero-snapshot]");
    const scrollCue = root.querySelector("[data-hero-scroll-cue]");

    if (reduced) {
      gsap.set(
        [grain, scan, wordmark, status, ...lineInners, accent, ...subs, ctas, snapshot, scrollCue],
        { clearProps: "all", opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (grain) {
      tl.fromTo(grain, { opacity: 0 }, { opacity: 0.35, duration: 1.2 }, 0);
      tl.to(grain, { opacity: 0.12, duration: 1.4 }, 1.2);
    }

    if (scan) {
      tl.fromTo(scan, { yPercent: -120, opacity: 0 }, { yPercent: 120, opacity: 0.5, duration: 1.6, ease: "none" }, 0.1);
      tl.to(scan, { opacity: 0, duration: 0.4 }, 1.4);
    }

    tl.fromTo(wordmark, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.25);
    tl.fromTo(status, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45);

    if (lineInners.length) {
      tl.fromTo(lineInners, { y: "110%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.95, stagger: 0.12 }, 0.55);
    }

    if (accent) {
      tl.fromTo(accent, { opacity: 0, y: "110%" }, { opacity: 1, y: "0%", duration: 0.95 }, 0.78);
    }

    if (subs.length) {
      tl.fromTo(subs, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.95);
    }

    if (ctas) {
      tl.fromTo(ctas, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 1.2);
    }

    if (snapshot) {
      tl.fromTo(snapshot, { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.9 }, 0.85);
    }

    if (scrollCue) {
      tl.fromTo(scrollCue, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 1.45);
      gsap.to(scrollCue, {
        y: 6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.1,
      });
    }

    if (wordmark) {
      gsap.to(wordmark, {
        opacity: 0.15,
        y: -24,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top+=120",
          scrub: 0.6,
        },
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative pt-14 md:pt-24 pb-20 md:pb-32 overflow-hidden"
    >
      <div
        data-hero-grain
        className="pointer-events-none absolute inset-0 opacity-0 motion-grain"
        aria-hidden="true"
      />
      <div
        data-hero-scan
        className="pointer-events-none absolute left-0 right-0 top-1/4 h-px bg-terracotta/30 opacity-0"
        aria-hidden="true"
      />

      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative">
        <div className="lg:col-span-8">
          <p
            data-hero-wordmark
            className="font-serif text-sm md:text-base tracking-[0.12em] uppercase text-foreground/70 mb-6 md:mb-8"
          >
            {profile.name}
          </p>

          <div data-hero-status className="flex items-center gap-3 mb-7 md:mb-10">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
            </span>
            <span className="overline text-foreground/80">{profile.status}</span>
          </div>

          <h1 data-testid="hero-headline" className="h-display">
            <SplitLines
              lines={[
                "Marketing with structure,",
                null,
              ]}
              lineClassName="pb-1"
            />
            <span className="block overflow-hidden pb-1" data-split-line>
              <span className="inline-block italic text-terracotta" data-hero-accent data-split-line-inner>
                curiosity, and intent.
              </span>
            </span>
          </h1>

          <p
            data-testid="hero-subheadline"
            data-hero-sub
            className="mt-7 md:mt-9 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed"
          >
            I'm Ahmed Mohsen Mostafa, a marketing student in Brussels building my path through research, campaigns, and hands-on strategic work.
          </p>
          <p
            data-hero-sub
            className="mt-3 max-w-2xl text-sm text-foreground/60 leading-relaxed"
          >
            Drawn to work that starts with clarity, stays curious, and leads to something genuinely useful.
          </p>

          <div
            data-hero-ctas
            className="mt-9 md:mt-11 flex flex-wrap items-center gap-3 sm:gap-4"
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

        <div className="lg:col-span-4">
          <div data-hero-snapshot className="space-y-4">
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

      <div
        data-hero-scroll-cue
        className="container-editorial mt-16 md:mt-24 hidden md:flex items-center gap-4 text-subtle"
      >
        <span className="h-px w-16 bg-hairline" aria-hidden="true" />
        <span className="overline">Scroll — recruiter snapshot below</span>
      </div>
    </section>
  );
}
