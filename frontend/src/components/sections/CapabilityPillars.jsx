import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { capabilities } from "@/lib/data";

export default function CapabilityPillars() {
  const [active, setActive] = useState(capabilities[0].id);

  return (
    <section
      data-testid="capability-pillars"
      className="py-24 md:py-32 bg-surface/50 border-y border-hairline"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 reveal">
            <p className="overline mb-4">Capabilities</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
              What a team gets when they hire me.
            </h2>
            <p className="mt-6 text-foreground/70 max-w-md leading-relaxed">
              Not three slides of buzzwords — three real ways I show up on a
              marketing team. Click each one to see what's behind it.
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
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActive(isOpen ? null : c.id)}
                      aria-expanded={isOpen}
                      aria-controls={`pillar-${c.id}`}
                      data-testid={`pillar-toggle-${c.id}`}
                      className="w-full flex items-start justify-between gap-6 py-7 md:py-9 text-left group"
                    >
                      <div className="flex items-start gap-6">
                        <span className="font-mono text-xs text-subtle pt-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight transition-colors group-hover:text-terracotta">
                            {c.label}
                          </h3>
                          {!isOpen && (
                            <p className="hidden md:block text-sm text-subtle mt-2 max-w-xl">
                              {c.summary}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="shrink-0 mt-2 w-9 h-9 inline-flex items-center justify-center border border-hairline rounded-full text-foreground transition-colors group-hover:border-terracotta group-hover:text-terracotta">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    <div
                      id={`pillar-${c.id}`}
                      className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
                        isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-0 md:pl-14 pb-9 max-w-2xl">
                        <p className="text-base text-foreground/80 leading-relaxed mb-5">
                          {c.summary}
                        </p>
                        <ul className="space-y-2.5">
                          {c.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-3 text-sm text-foreground/85"
                            >
                              <span className="mt-2 inline-block w-3 h-px bg-terracotta shrink-0" />
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
