import { useEffect, useRef } from "react";
import gsap from "gsap";
import { proofPoints } from "@/lib/data";

/**
 * Section after hero — "Signal readout".
 * Bridges the dark cinematic hero into the cream editorial body: the page stays
 * dark while the proof metrics resolve like instrument readings (count-up), then
 * fades to the warm background for the journey below.
 */
export default function ProofStrip() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-proof-item]");

      items.forEach((item) => {
        const numberEl = item.querySelector("[data-count]");
        const target = numberEl ? Number(numberEl.dataset.count) : null;

        const reveal = () => {
          if (target != null) {
            const counter = { v: 0 };
            gsap.to(counter, {
              v: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                numberEl.textContent = String(Math.round(counter.v));
              },
            });
          }
        };

        if (reducedMotion) {
          gsap.set(item, { opacity: 1, y: 0 });
          if (numberEl) numberEl.textContent = String(target);
          return;
        }

        gsap.set(item, { opacity: 0, y: 24 });
        ScrollReveal(item, () => {
          gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
          reveal();
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="proof-strip"
      className="relative isolate overflow-hidden bg-[#0B0A09] text-[#F2F0EA]"
    >
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="container-editorial relative z-10 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="mb-10 flex items-center gap-3 md:mb-14">
          <span className="h-px w-8 bg-terracotta" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#F2F0EA]/55">
            Signal // Proof
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F2F0EA]/10">
          {proofPoints.map((p, i) => {
            const match = String(p.value).match(/^(\d+)([\s\S]*)$/);
            const isNumeric = Boolean(match);
            return (
              <div
                key={p.label}
                data-proof-item
                data-testid={`proof-item-${i}`}
                className="flex min-h-[200px] flex-col bg-[#0B0A09] px-6 py-8 md:px-7 md:py-10"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-terracotta/85">
                  {String(i + 1).padStart(2, "0")} — {p.label}
                </p>

                <p
                  className={`mt-6 font-serif font-light leading-none tracking-tight text-[#F7F5EC] ${
                    isNumeric
                      ? "text-5xl md:text-6xl"
                      : "text-2xl md:text-3xl"
                  }`}
                >
                  {isNumeric ? (
                    <>
                      <span data-count={match[1]}>0</span>
                      <span className="text-terracotta">{match[2]}</span>
                    </>
                  ) : (
                    p.value
                  )}
                </p>

                {!isNumeric && p.descriptor ? (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#F2F0EA]/45">
                    {p.descriptor}
                  </p>
                ) : null}

                <p className="mt-auto pt-6 text-sm leading-relaxed text-[#F2F0EA]/65 max-w-[26ch]">
                  {p.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Lightweight one-shot intersection trigger (no ScrollTrigger dependency).
function ScrollReveal(el, onEnter) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter();
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.25 }
  );
  io.observe(el);
}
