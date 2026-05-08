import { useState } from "react";
import { capabilities } from "@/lib/data";
import VolvoProjectModal from "@/components/projects/VolvoProjectModal";

/**
 * Calm, editorial pillar accordion.
 * Indicator: a horizontal line that rotates 90° to a plus when collapsed,
 * smoother and quieter than icon swaps.
 */
export default function CapabilityPillars() {
  const [active, setActive] = useState(capabilities[0].id);

  return (
    <section
      data-testid="capability-pillars"
      className="py-24 md:py-36 bg-surface/40 border-y border-hairline"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 reveal">
            <p className="overline mb-4">Capabilities</p>
            <h2 className="h-section">What a team gets when they hire me.</h2>
            <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
              Three real ways I show up on a marketing team — not three
              slides of buzzwords. Click each to expand.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-hairline">
              {capabilities.map((c, i) => {
                const isOpen = active === c.id;
                return (
                  <div
                    key={c.id}
                    className="border-b border-hairline reveal"
                    style={{ transitionDelay: `${i * 110}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(isOpen ? null : c.id)}
                      aria-expanded={isOpen}
                      aria-controls={`pillar-${c.id}`}
                      data-testid={`pillar-toggle-${c.id}`}
                      className="w-full flex items-center justify-between gap-6 py-7 md:py-9 text-left group min-h-[60px]"
                    >
                      <div className="flex items-baseline gap-5 md:gap-8 flex-1 min-w-0">
                        <span className="font-mono text-[11px] tracking-widest text-subtle pt-1 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <h3
                            className={`font-serif text-2xl md:text-[1.85rem] tracking-tight leading-tight transition-colors duration-300 ${
                              isOpen
                                ? "text-terracotta"
                                : "text-foreground group-hover:text-terracotta"
                            }`}
                          >
                            {c.label}
                          </h3>
                          {!isOpen && (
                            <p className="hidden md:block text-sm text-subtle mt-2 max-w-xl leading-relaxed">
                              {c.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Calm line indicator — horizontal when open, plus when closed */}
                      <span
                        aria-hidden="true"
                        className="shrink-0 relative w-7 h-7 inline-flex items-center justify-center"
                      >
                        <span
                          className={`absolute h-px bg-current w-5 transition-colors duration-300 ${
                            isOpen ? "text-terracotta" : "text-foreground/70 group-hover:text-terracotta"
                          }`}
                        />
                        <span
                          className={`absolute h-px bg-current w-5 transition-all duration-500 ease-out ${
                            isOpen ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
                          } ${isOpen ? "text-terracotta" : "text-foreground/70 group-hover:text-terracotta"}`}
                        />
                      </span>
                    </button>

                    <div
                      id={`pillar-${c.id}`}
                      className={`overflow-hidden transition-[max-height,opacity] ease-out ${
                        isOpen
                          ? "max-h-[520px] opacity-100 duration-700"
                          : "max-h-0 opacity-0 duration-500"
                      }`}
                    >
                      <div className="pl-0 md:pl-[88px] pb-9 max-w-2xl">
                        <p className="text-base text-foreground/85 leading-relaxed mb-6">
                          {c.summary}
                        </p>
                        {/* If this is the campaign/capability pillar, surface the Volvo modal trigger */}
                        {c.id === "campaign" && (
                          <div className="mt-6">
                            <p className="text-sm text-foreground/75 mb-3">Featured strategic project</p>
                            <VolvoProjectModal />
                          </div>
                        )}
                        <ul className="space-y-3">
                          {c.bullets.map((b, j) => (
                            <li
                              key={b}
                              className="flex items-start gap-4 text-sm md:text-base text-foreground/85"
                              style={{
                                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                                transitionDelay: `${120 + j * 70}ms`,
                                opacity: isOpen ? 1 : 0,
                                transform: isOpen ? "translateY(0)" : "translateY(6px)",
                              }}
                            >
                              <span className="mt-3 inline-block w-4 h-px bg-terracotta shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
