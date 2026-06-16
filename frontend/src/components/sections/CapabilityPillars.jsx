import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/data";
import VolvoProjectModal from "@/components/projects/VolvoProjectModal";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function CapabilityPillars() {
  const [active, setActive] = useState(capabilities[0].id);
  const panelRefs = useRef({});
  const isFirstRender = useRef(true);

  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();
    const intro = root.querySelector("[data-pillar-intro]");
    const rows = root.querySelectorAll("[data-pillar-row]");

    if (reduced) {
      gsap.set([intro, ...rows], { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    gsap.fromTo(intro, { opacity: 0, y: 28 }, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: intro, start: "top 85%", once: true },
    });

    gsap.fromTo(rows, { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: root.querySelector("[data-pillar-list]"), start: "top 88%", once: true },
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      capabilities.forEach((c) => {
        const panel = panelRefs.current[c.id];
        if (!panel) return;
        if (active === c.id) {
          gsap.set(panel, { height: "auto", opacity: 1 });
        } else {
          gsap.set(panel, { height: 0, opacity: 0 });
        }
      });
      return;
    }

    capabilities.forEach((c) => {
      const panel = panelRefs.current[c.id];
      if (!panel) return;
      const isOpen = active === c.id;
      const bullets = panel.querySelectorAll("[data-pillar-bullet]");

      if (isOpen) {
        gsap.set(panel, { height: "auto", overflow: "hidden" });
        const height = panel.scrollHeight;
        gsap.fromTo(panel, { height: 0, opacity: 0 }, {
          height,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => gsap.set(panel, { height: "auto" }),
        });
        gsap.fromTo(bullets, { opacity: 0, y: 8 }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          delay: 0.12,
          ease: "power2.out",
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });
      }
    });
  }, [active]);

  const toggle = (id) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={ref}
      data-testid="capability-pillars"
      className="py-24 md:py-36 bg-surface/40 border-y border-hairline"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div data-pillar-intro className="lg:col-span-4">
            <p className="overline mb-4">CAPABILITIES</p>
            <h2 className="h-section">What I bring to a team.</h2>
            <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
              Three areas I keep returning to in my work: research, campaign thinking, and execution.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div data-pillar-list className="border-t border-hairline">
              {capabilities.map((c, i) => {
                const isOpen = active === c.id;
                return (
                  <div
                    key={c.id}
                    data-pillar-row
                    className="border-b border-hairline"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(c.id)}
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
                      ref={(el) => {
                        panelRefs.current[c.id] = el;
                      }}
                      className="overflow-hidden"
                      style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    >
                      <div className="pl-0 md:pl-[88px] pb-9 max-w-2xl">
                        <p className="text-base text-foreground/85 leading-relaxed mb-6">
                          {c.summary}
                        </p>
                        {c.id === "campaign" && (
                          <div className="mt-6">
                            <p className="text-sm text-foreground/75 mb-3">Featured strategic project</p>
                            <VolvoProjectModal />
                          </div>
                        )}
                        <ul className="space-y-3">
                          {c.bullets.map((b) => (
                            <li
                              key={b}
                              data-pillar-bullet
                              className="flex items-start gap-4 text-sm md:text-base text-foreground/85"
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
