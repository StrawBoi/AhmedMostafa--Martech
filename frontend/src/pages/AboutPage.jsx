import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { capabilities, journeyChapters, profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";

export default function AboutPage() {
  useReveal();
  const onLinkedIn = () => track(Events.LINKEDIN_CLICKED, { source: "about" });

  return (
    <main data-testid="about-page" className="pt-12 md:pt-20">
      <section className="container-editorial pb-20 md:pb-28">
        <p className="overline mb-5 reveal">About</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-5xl reveal">
          A marketing candidate who reads like a{" "}
          <span className="italic text-terracotta">strategist with a builder's wrench.</span>
        </h1>
      </section>

      <section className="container-editorial pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">Profile</p>
          <p className="font-serif text-2xl leading-snug">
            BBA in Business Management & Marketing
          </p>
          <p className="text-subtle text-sm mt-2">Odisee, Brussels — expected 2026</p>

          <div className="mt-10 space-y-3 text-sm">
            <p>
              <span className="overline block mb-1">Based in</span>
              Brussels, Belgium
            </p>
            <p>
              <span className="overline block mb-1">Languages</span>
              English (fluent), Arabic (native), Dutch & French (working)
            </p>
            <p>
              <span className="overline block mb-1">Status</span>
              {profile.status}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <CVButton variant="primary" source="about" testId="about-download-cv" />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              onClick={onLinkedIn}
              data-testid="about-linkedin"
              className="btn-ghost"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <div className="reveal">
            <p className="overline mb-3">In one paragraph</p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/85">
              I'm Ahmed — a Business Management & Marketing student at Odisee
              with a long runway in technical and operational environments
              before this. That mix is the point: I bring a marketing
              candidate's curiosity for customers and storytelling, with an
              operator's instinct for what's actually shippable, measurable,
              and worth doing.
            </p>
          </div>

          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <p className="overline mb-3">How I work on a marketing team</p>
            <ul className="space-y-3 text-base md:text-lg leading-relaxed text-foreground/85">
              <li>— I start with the customer, not the channel.</li>
              <li>— I write less, decide faster, and ship the smallest useful version.</li>
              <li>— I instrument it so we know if it actually moved the needle.</li>
              <li>— I document what worked so the next person doesn't start from scratch.</li>
            </ul>
          </div>

          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p className="overline mb-3">Capabilities</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {capabilities.map((c) => (
                <div key={c.id} className="border-t border-hairline pt-5">
                  <p className="font-serif text-xl leading-snug">{c.label}</p>
                  <p className="text-sm text-subtle mt-2 leading-relaxed">{c.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "300ms" }}>
            <p className="overline mb-3">Journey</p>
            <ol className="space-y-7">
              {journeyChapters.map((c, i) => (
                <li key={c.title} className="grid grid-cols-12 gap-4">
                  <span className="col-span-3 overline text-terracotta pt-1">{c.period}</span>
                  <div className="col-span-9">
                    <p className="font-serif text-lg leading-snug">{c.title}</p>
                    <p className="text-sm text-subtle mt-1.5 leading-relaxed">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-editorial pb-32 reveal">
        <div className="border-t border-hairline pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-serif text-2xl md:text-3xl tracking-tight max-w-xl leading-snug">
            Let's see if your team is the right fit.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
