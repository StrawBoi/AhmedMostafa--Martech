import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { gsap } from "@/lib/motion/gsap";
import { prefersReducedMotion } from "@/lib/motion/presets";

export default function FeaturedWork() {
  const ref = useScrollAnimation((root) => {
    const reduced = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const intro = root.querySelector("[data-featured-intro]");
    const cards = root.querySelectorAll("[data-featured-card]");
    const cta = root.querySelector("[data-featured-cta]");

    if (reduced) {
      gsap.set([intro, ...cards, cta], { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      return;
    }

    gsap.fromTo(intro, { opacity: 0, y: 28 }, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: { trigger: intro, start: "top 85%", once: true },
    });

    cards.forEach((card, i) => {
      const image = card.querySelector("[data-featured-image]");

      gsap.fromTo(
        card,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );

      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        if (!mobile) {
          gsap.to(image, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      }
    });

    if (cta) {
      gsap.fromTo(cta, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: cta, start: "top 90%", once: true },
      });
    }
  }, []);

  return (
    <section ref={ref} data-testid="featured-work" className="py-24 md:py-36">
      <div className="container-editorial">
        <div data-featured-intro className="flex items-end justify-between gap-6 mb-6 md:mb-12">
          <div>
            <p className="overline mb-4">SELECTED WORK</p>
            <h2 className="h-section max-w-2xl">A few projects that show how I think.</h2>
            <p className="mt-3 text-sm text-foreground/75">These projects reflect the kind of work I enjoy most: understanding a problem, shaping a clear direction, and turning it into something concrete.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-featured-card className="md:col-span-1">
            <FeaturedProjectCard projectId="volvo-belgium-campaign" dominant imageDataAttr="data-featured-image" />
          </div>
          <div data-featured-card className="md:col-span-1">
            <FeaturedProjectCard projectId="cinematek-decades-of-cinema" imageDataAttr="data-featured-image" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-featured-card className="md:col-span-1">
            <FeaturedProjectCard projectId="mosol-profit-intelligence" imageDataAttr="data-featured-image" />
          </div>
          <div data-featured-card className="md:col-span-1">
            <FeaturedProjectCard projectId="marketing-intelligence-analysis" imageDataAttr="data-featured-image" />
          </div>
        </div>

        <div data-featured-cta className="mt-12">
          <div className="border-t border-hairline pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="font-serif text-xl md:text-2xl tracking-tight max-w-xl leading-snug">
              See the full project archive.
            </p>
            <Link to="/projects" className="btn-primary group self-start md:self-auto">
              Browse all projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
