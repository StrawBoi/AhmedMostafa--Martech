import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/motion/gsap";
import SplitLines from "@/components/motion/SplitLines";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function ContactCTA() {
  const onLinkedIn = () =>
    track(Events.LINKEDIN_CLICKED, { source: "home_cta" });

  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();
    const band = root.querySelector("[data-cta-band]");
    const lineInners = root.querySelectorAll("[data-split-line-inner]");
    const copy = root.querySelectorAll("[data-cta-copy]");
    const actions = root.querySelectorAll("[data-cta-action]");

    if (reduced) {
      gsap.set([band, ...lineInners, ...copy, ...actions], {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        clearProps: "all",
      });
      return;
    }

    gsap.fromTo(
      band,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 90%", once: true },
      }
    );

    if (lineInners.length) {
      gsap.fromTo(
        lineInners,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
        }
      );
    }

    gsap.fromTo(copy, { opacity: 0, y: 16 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: root, start: "top 78%", once: true },
    });

    gsap.fromTo(actions, { opacity: 0, scale: 0.96 }, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: root, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section
      ref={ref}
      data-testid="contact-cta"
      data-cta-band
      className="py-24 md:py-40 bg-[hsl(var(--foreground)/0.95)] text-background border-t border-hairline/40"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-8">
            <p data-cta-copy className="overline text-background/60 mb-6">Contact</p>
            <h2
              className="font-serif font-light tracking-tight leading-[1.04] text-4xl md:text-6xl lg:text-[5rem] max-w-[17ch]"
              style={{ textWrap: "balance" }}
            >
              <SplitLines
                lines={["Interested in", "working together?"]}
              />
            </h2>
            <p data-cta-copy className="mt-6 text-background/90 text-base md:text-lg max-w-xl leading-relaxed">
              If you’re hiring for a marketing internship and think there could be a fit, I’d be glad to hear from you.
            </p>
            <p data-cta-copy className="mt-6 text-background/75 text-sm max-w-xl leading-relaxed">The contact form is the fastest way to reach me. I read every message myself and reply within 48 hours.</p>
          </div>

          <div className="lg:col-span-4">
            <div className="flex flex-col gap-3.5">
              <Link
                to="/contact"
                data-cta-action
                data-testid="cta-contact-page"
                className="inline-flex items-center justify-between gap-4 bg-terracotta hover:bg-terracotta-hover text-white px-6 py-5 transition-all duration-300 group min-h-[64px]"
              >
                <span className="font-serif text-xl">Open the contact form</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onLinkedIn}
                data-cta-action
                data-testid="cta-linkedin"
                className="inline-flex items-center justify-between gap-4 border border-background/30 hover:border-background text-background px-6 py-5 transition-colors duration-300 group min-h-[64px]"
              >
                <span className="font-serif text-xl">Connect on LinkedIn</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <div data-cta-action>
                <CVButton
                  variant="inverted"
                  source="home_cta"
                  testId="cta-download-cv"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
