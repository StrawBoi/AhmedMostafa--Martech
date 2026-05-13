import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { capabilities, journeyChapters, profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";
import Seo from "@/components/Seo";

export default function AboutPage() {
  useReveal();
  const onLinkedIn = () => track(Events.LINKEDIN_CLICKED, { source: "about" });

  return (
    <main data-testid="about-page" className="pt-12 md:pt-20">
      <Seo
        title="About Ahmed Mohsen Mostafa | Marketing Student in Brussels"
        description="Learn how Ahmed Mohsen Mostafa works: a marketing student in Brussels with an operations background, a practical mindset, and experience spanning strategy, research, and digital execution."
        canonicalPath="/about"
        image="/ahmed-mostafa-professional.png"
        imageAlt="Ahmed Mostafa professional headshot"
        keywords={[
          "about Ahmed Mohsen Mostafa",
          "marketing student Brussels",
          "marketing intern Belgium",
        ]}
      />
      {/* Professional Photo Hero Section */}
      <section className="container-editorial pb-16 md:pb-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 reveal">
            <p className="overline mb-5">ABOUT</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] reveal">
              How I think and work.
            </h1>
          </div>
          <div className="lg:w-1/2 reveal" style={{ transitionDelay: "100ms" }}>
            <img
              src="/ahmed-mostafa-professional.png"
              alt="Ahmed Mostafa - Professional headshot"
              className="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="reveal">
            <p className="overline mb-3">Profile</p>
            <p className="text-base leading-relaxed text-foreground/85">
              I'm Ahmed — a Business Management & Marketing student at Odisee with an operations background that taught me how things actually ship. That mix matters: I bring marketing curiosity for customers and storytelling, paired with an operator's instinct for what's measurable and worth doing. I also have a light software development background, which helps me understand digital products and work comfortably across strategy and execution.
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <p className="overline mb-3">How I show up on a team</p>
            <ul className="space-y-2 text-sm text-foreground/85">
              <li>• Start with the customer, not the channel.</li>
              <li>• Write less, ship faster, measure everything.</li>
              <li>• Document so the next person doesn't start from scratch.</li>
            </ul>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p className="overline mb-3">Connect</p>
            <div className="flex flex-col gap-3">
              <CVButton variant="primary" source="about" testId="about-download-cv" />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onLinkedIn}
                data-testid="about-linkedin"
                className="btn-ghost text-sm"
              >
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "300ms" }}>
            <p className="overline mb-3">Quick facts</p>
            <div className="space-y-2 text-sm text-foreground/80">
              <p><span className="font-medium">Based in:</span> Brussels, Belgium</p>
              <p><span className="font-medium">Languages:</span> English (fluent), Arabic (native), Dutch & French (working)</p>
              <p><span className="font-medium">Availability:</span> Summer 2026 internships</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-32 reveal">
        <div className="border-t border-hairline pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-subtle">Want to explore an internship? Let's talk.</p>
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
