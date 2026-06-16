import { journeyChapters } from "@/lib/data";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function Journey() {
  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();
    const intro = root.querySelector("[data-journey-intro]");
    const chapters = root.querySelectorAll("[data-journey-chapter]");
    const progress = root.querySelector("[data-journey-progress]");
    const progressFill = root.querySelector("[data-journey-progress-fill]");
    const mobile = window.matchMedia("(max-width: 768px)").matches;

    if (reduced) {
      gsap.set([intro, ...chapters, progress, progressFill], {
        opacity: 1,
        y: 0,
        scaleY: 1,
        clearProps: "all",
      });
      return;
    }

    gsap.fromTo(intro, { opacity: 0, y: 32 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: intro,
        start: "top 85%",
        once: true,
      },
    });

    ScrollTrigger.batch(chapters, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((chapter) => {
          const border = chapter.querySelector("[data-journey-border]");
          const index = chapter.querySelector("[data-journey-index]");
          const body = chapter.querySelector("[data-journey-body]");

          gsap.fromTo(chapter, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" });

          if (border) {
            gsap.fromTo(border, { scaleY: 0, transformOrigin: "top center" }, {
              scaleY: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          }

          if (index) {
            gsap.fromTo(index, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.15 });
          }

          if (body) {
            gsap.fromTo(body, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.2 });
          }
        });
      },
    });

    if (!mobile && progress && progressFill && chapters.length) {
      ScrollTrigger.create({
        trigger: root.querySelector("[data-journey-chapters]"),
        start: "top center",
        end: "bottom center",
        pin: intro,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.fromTo(
        progressFill,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector("[data-journey-chapters]"),
            start: "top center",
            end: "bottom center",
            scrub: 0.4,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      data-testid="selected-journey"
      className="py-24 md:py-36"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div data-journey-intro className="lg:col-span-4 relative">
          <p className="overline mb-4">SELECTED JOURNEY</p>
          <h2 className="h-section">How I got here.</h2>
          <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
            A quick look at the path behind my interest in marketing, strategy, and execution.
          </p>
          <div
            data-journey-progress
            className="hidden lg:block absolute -left-6 top-0 bottom-0 w-px bg-hairline"
            aria-hidden="true"
          >
            <div
              data-journey-progress-fill
              className="w-full h-full bg-terracotta origin-top scale-y-0"
            />
          </div>
        </div>

        <div data-journey-chapters className="lg:col-span-8 relative">
          <ol className="space-y-12 md:space-y-16">
            {journeyChapters.map((chapter, i) => (
              <li
                key={chapter.title}
                data-journey-chapter
                data-testid={`journey-chapter-${i}`}
                className="grid grid-cols-12 gap-5 md:gap-6"
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="overline text-terracotta">{chapter.period}</p>
                  <p
                    data-journey-index
                    className="font-mono text-[11px] tracking-widest text-subtle mt-2"
                  >
                    {String(i + 1).padStart(2, "0")} / {String(journeyChapters.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 md:border-l border-hairline md:pl-8 relative">
                  <span
                    data-journey-border
                    className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-terracotta/50 origin-top scale-y-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl md:text-[1.85rem] tracking-tight leading-tight">
                    {chapter.title}
                  </h3>
                  <p
                    data-journey-body
                    className="mt-4 text-foreground/80 leading-relaxed max-w-2xl"
                  >
                    {chapter.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
