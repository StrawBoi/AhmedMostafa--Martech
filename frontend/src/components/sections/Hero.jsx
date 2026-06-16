import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/lib/data";
import HeroShaderCanvas from "@/components/sections/HeroShaderCanvas";
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

      gsap.set(words, { opacity: 0, y: 52, rotateX: -32, transformOrigin: "50% 100%" });
      gsap.set(signal, { opacity: 0, letterSpacing: "0.4em" });
      gsap.set(scan, { top: "0%", opacity: 0 });

      // Let the shader resolve out of black first, then lock in the identity.
      const tl = gsap.timeline({ delay: 1.1, defaults: { ease: "power3.out" } });

      tl.to(scan, { opacity: 0.85, duration: 0.25 })
        .to(scan, { top: "100%", duration: 1.4, ease: "power2.inOut" })
        .to(scan, { opacity: 0, duration: 0.2 }, "-=0.15")
        .to(
          words,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.24,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.95"
        )
        .to(
          signal,
          {
            opacity: 1,
            letterSpacing: "0.22em",
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0B0A09]"
    >
      <HeroShaderCanvas />
      <HeroSignalLayer scanRef={scanRef} signalRef={signalRef} />

      <div className="relative z-10 px-5 text-center">
        <h1
          data-testid="hero-headline"
          className="font-serif font-light tracking-tight leading-[1.02] text-[clamp(2.75rem,8vw,6.5rem)] [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]"
          style={{ perspective: "900px" }}
        >
          {NAME_WORDS.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden px-[0.08em]">
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className={`inline-block ${
                  word === "Mohsen"
                    ? "italic text-terracotta"
                    : "bg-gradient-to-br from-[#F7F5EC] via-[#E8E4D8] to-[#9C9890] bg-clip-text text-transparent"
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
