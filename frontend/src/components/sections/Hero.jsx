import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/lib/data";
import HeroLightBeams from "@/components/sections/HeroLightBeams";
import HeroSignalLayer from "@/components/sections/HeroSignalLayer";

const NAME_WORDS = profile.name.split(" ");

export default function Hero() {
  const sectionRef = useRef(null);
  const scanRef = useRef(null);
  const signalRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = wordRefs.current.filter(Boolean);
      const scan = scanRef.current;
      const signal = signalRef.current;

      if (reducedMotion) {
        gsap.set([words, signal], { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set(scan, { opacity: 0 });
        return;
      }

      gsap.set(words, { opacity: 0, y: 48, rotateX: -28, transformOrigin: "50% 100%" });
      gsap.set(signal, { opacity: 0, letterSpacing: "0.38em" });
      gsap.set(scan, { top: "0%", opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(scan, { opacity: 0.85, duration: 0.25 })
        .to(scan, {
          top: "100%",
          duration: 1.35,
          ease: "power2.inOut",
        })
        .to(scan, { opacity: 0, duration: 0.2 }, "-=0.15")
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.22,
            duration: 1.05,
            ease: "power4.out",
          },
          "-=0.85"
        )
        .to(
          signal,
          {
            opacity: 1,
            letterSpacing: "0.22em",
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.35"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
    >
      <HeroLightBeams />
      <HeroSignalLayer scanRef={scanRef} signalRef={signalRef} />

      <div className="relative z-10 px-5 text-center">
        <h1
          data-testid="hero-headline"
          className="font-serif font-light tracking-tight leading-[1.02] text-[clamp(2.75rem,8vw,6.5rem)]"
          style={{ perspective: "900px" }}
        >
          {NAME_WORDS.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden px-[0.08em]">
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className={`inline-block ${
                  word === "Mohsen" ? "italic text-terracotta" : ""
                }`}
              >
                {word}
                {i < NAME_WORDS.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
