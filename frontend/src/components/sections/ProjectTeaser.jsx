import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * "Reel // Work" — a film-contact-sheet of real project stills that drifts
 * continuously and reacts to scroll velocity (speeds up + skews while you move).
 * Extends the dark hero/signal world for one more beat, then releases to the
 * cream editorial body. This is the immersive "teaser" layer of the story.
 */
const FRAMES = [
  { id: "volvo-belgium-campaign", label: "Campaign Strategy", title: "Volvo — Made in Belgium", src: "/projects/volvo/Strategy.png" },
  { id: "cinematek-decades-of-cinema", label: "Cultural Campaign", title: "CINEMATEK — Decades", src: "/projects/cinematek/cinematek-decades-60s-poster.png" },
  { id: "mosol-profit-intelligence", label: "Profit Intelligence", title: "MOSOL — POS to Profit", src: "/projects/Mosol/dashboard.png" },
  { id: "marketing-intelligence-analysis", label: "Marketing Analytics", title: "Marketing Intelligence", src: "/projects/marketing-intelligence/Martech_overview.png" },
  { id: "tackle-pricing-intelligence", label: "Pricing Intelligence", title: "Tackle — Pricing", src: "/projects/Tackle/tackle-dashboard.png" },
  { id: "brand-identity-transformation", label: "Brand Identity", title: "Vantier — Rebrand", src: "/projects/Vantier/VantierBT.png" },
];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function Frame({ frame, index }) {
  return (
    <Link
      to={`/projects/${frame.id}`}
      className="reel-frame group/frame relative block h-[230px] w-[300px] shrink-0 overflow-hidden bg-[#15130F] md:h-[300px] md:w-[420px]"
      aria-label={`${frame.title} — ${frame.label}`}
    >
      <img
        src={frame.src}
        alt={frame.title}
        loading="lazy"
        draggable="false"
        className="h-full w-full object-cover opacity-80 transition-all duration-500 ease-out will-change-transform group-hover/frame:scale-[1.04] group-hover/frame:opacity-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/10 to-transparent" />

      <div className="absolute left-4 top-4 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-terracotta">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F2F0EA]/55">
          {frame.label}
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
        <h3 className="font-serif text-lg font-light leading-tight text-[#F7F5EC] md:text-xl">
          {frame.title}
        </h3>
        <ArrowUpRight
          size={18}
          className="shrink-0 text-[#F2F0EA]/60 transition-all duration-300 group-hover/frame:translate-x-0.5 group-hover/frame:-translate-y-0.5 group-hover/frame:text-terracotta"
        />
      </div>
    </Link>
  );
}

export default function ProjectTeaser() {
  const trackRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || reduced) return;

    let offset = 0;
    let velocity = 0;
    let last = performance.now();
    let lastScrollY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      velocity += y - lastScrollY;
      lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = (now) => {
      const dt = Math.min(50, now - last) / 1000;
      last = now;

      // Continuous leftward drift + scroll-velocity contribution.
      offset += 26 * dt + velocity * 0.45;
      velocity *= 0.9;

      const half = track.scrollWidth / 2;
      if (half > 0) offset = ((offset % half) + half) % half;

      const skew = clamp(velocity * 0.04, -5, 5);
      track.style.transform = `translate3d(${-offset}px,0,0) skewX(${skew}deg)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      data-testid="project-teaser"
      className="relative isolate overflow-hidden bg-[#0B0A09] py-20 text-[#F2F0EA] md:py-28"
    >
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-terracotta" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#F2F0EA]/55">
                Reel // Work
              </span>
            </div>
            <h2 className="font-serif text-4xl font-light leading-[1.05] tracking-tight text-[#F7F5EC] md:text-5xl">
              Six projects,<span className="italic text-terracotta"> in motion.</span>
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 border-b border-[#F2F0EA]/30 pb-1 text-sm tracking-wide text-[#F2F0EA]/85 transition-colors hover:border-terracotta hover:text-terracotta"
          >
            Open the archive
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Full-bleed drifting reel */}
      <div className="relative z-10 mt-12 overflow-hidden md:mt-16" aria-hidden="false">
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform md:gap-5"
        >
          {[...FRAMES, ...FRAMES].map((frame, i) => (
            <Frame key={`${frame.id}-${i}`} frame={frame} index={i % FRAMES.length} />
          ))}
        </div>

        {/* Edge fades to keep the reel feeling endless */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0B0A09] to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0B0A09] to-transparent md:w-32" />
      </div>

      {/* Release the dark world into the editorial body */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
    </section>
  );
}
