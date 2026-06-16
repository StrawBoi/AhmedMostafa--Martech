import { proofPoints } from "@/lib/data";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

function parseNumericValue(value) {
  const str = String(value);
  const match = str.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return {
    number: parseFloat(match[1]),
    prefix: str.slice(0, match.index),
    suffix: str.slice(match.index + match[1].length),
  };
}

export default function ProofStrip() {
  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();
    const items = root.querySelectorAll("[data-proof-item]");

    if (reduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      root.querySelectorAll("[data-proof-value]").forEach((el) => {
        el.textContent = el.dataset.proofValueText;
      });
      return;
    }

    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
        );

        batch.forEach((item) => {
          const valueEl = item.querySelector("[data-proof-value]");
          if (!valueEl) return;

          if (valueEl.dataset.proofConcept === "true") {
            const words = valueEl.dataset.proofValueText.split(" ");
            valueEl.innerHTML = words
              .map((w) => `<span class="inline-block opacity-0" data-proof-word>${w}</span>`)
              .join(" ");
            gsap.to(item.querySelectorAll("[data-proof-word]"), {
              opacity: 1,
              duration: 0.5,
              stagger: 0.12,
              ease: "power2.out",
              delay: 0.15,
            });
            return;
          }

          const parsed = parseNumericValue(valueEl.dataset.proofValueText);
          if (!parsed) {
            valueEl.textContent = valueEl.dataset.proofValueText;
            return;
          }

          const counter = { val: 0 };
          gsap.to(counter, {
            val: parsed.number,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.1,
            onUpdate: () => {
              const display = Math.round(counter.val);
              valueEl.textContent = `${parsed.prefix}${display}${parsed.suffix}`;
            },
          });
        });
      },
    });
  }, []);

  return (
    <section
      ref={ref}
      data-testid="proof-strip"
      className="border-y border-hairline bg-surface/50"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x lg:divide-y-0 lg:divide-x divide-hairline">
          {proofPoints.map((p, i) => {
            const isConcept = p.kind === "concept" || !/\d/.test(String(p.value));
            return (
            <div
              key={p.label}
              data-proof-item
              data-testid={`proof-item-${i}`}
              className="relative py-8 md:py-12 px-0 sm:px-7 first:sm:pl-0 last:sm:pr-0 min-h-[164px] md:min-h-[180px] flex flex-col"
            >
              <p className="overline mb-3 text-foreground/65">{p.label}</p>
              <p
                data-proof-value
                data-proof-value-text={p.value}
                data-proof-concept={isConcept ? "true" : "false"}
                className={`font-serif leading-none text-foreground ${
                  isConcept
                    ? "text-xl md:text-2xl tracking-tight"
                    : "text-3xl md:text-4xl tracking-[-0.01em]"
                }`}
              >
                {isConcept ? p.value : "0"}
              </p>
              {isConcept && p.descriptor ? (
                <p className="text-[11px] uppercase tracking-overline text-foreground/60 mt-2">
                  {p.descriptor}
                </p>
              ) : null}
              <p className="text-sm text-subtle mt-3 leading-relaxed max-w-[24ch]">{p.detail}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
