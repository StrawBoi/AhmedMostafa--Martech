import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";

export default function ContactCTA() {
  const onLinkedIn = () =>
    track(Events.LINKEDIN_CLICKED, { source: "home_cta" });

  return (
    <section
      data-testid="contact-cta"
      className="py-24 md:py-40 bg-[hsl(var(--foreground)/0.95)] text-background border-t border-hairline/40"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          <div className="lg:col-span-8 reveal">
            <p className="overline text-background/60 mb-6">Contact</p>
            <h2 className="font-serif font-light tracking-tight leading-[1.04] text-4xl md:text-6xl lg:text-[5rem] max-w-[17ch]" style={{ textWrap: "balance" }}>
              Interested in working together?
            </h2>
            <p className="mt-6 text-background/90 text-base md:text-lg max-w-xl leading-relaxed">
              If you’re hiring for a marketing internship and think there could be a fit, I’d be glad to hear from you.
            </p>
            <p className="mt-6 text-background/75 text-sm max-w-xl leading-relaxed">The contact form is the fastest way to reach me. I read every message myself and reply within 48 hours.</p>
          </div>

          <div className="lg:col-span-4 reveal" style={{ transitionDelay: "150ms" }}>
            <div className="flex flex-col gap-3.5">
              <Link
                to="/contact"
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
                data-testid="cta-linkedin"
                className="inline-flex items-center justify-between gap-4 border border-background/30 hover:border-background text-background px-6 py-5 transition-colors duration-300 group min-h-[64px]"
              >
                <span className="font-serif text-xl">Connect on LinkedIn</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
              <CVButton
                variant="inverted"
                source="home_cta"
                testId="cta-download-cv"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
