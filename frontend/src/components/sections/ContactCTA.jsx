import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { profile } from "@/lib/data";

export default function ContactCTA() {
  return (
    <section
      data-testid="contact-cta"
      className="py-24 md:py-36 bg-foreground text-background"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8 reveal">
            <p className="overline text-background/60 mb-6">Let's talk</p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02]">
              Hiring a marketing intern{" "}
              <span className="italic text-terracotta">in Belgium</span> or{" "}
              <span className="italic text-terracotta">Europe?</span>
              <br />I'd love to hear about it.
            </h2>
            <p className="mt-8 text-background/70 text-lg max-w-xl leading-relaxed">
              I respond to every recruiter and hiring manager email within
              48 hours, including weekends.
            </p>
          </div>

          <div className="lg:col-span-4 reveal" style={{ transitionDelay: "150ms" }}>
            <div className="flex flex-col gap-4">
              <Link
                to="/contact"
                data-testid="cta-contact-page"
                className="inline-flex items-center justify-between gap-4 bg-terracotta hover:bg-terracotta-hover text-white px-6 py-5 transition-colors group"
              >
                <span className="font-serif text-xl">Open the contact form</span>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
              <a
                href={`mailto:${profile.email}`}
                data-testid="cta-mailto"
                className="inline-flex items-center justify-between gap-4 border border-background/30 hover:border-background text-background px-6 py-5 transition-colors"
              >
                <span className="inline-flex items-center gap-3 text-sm">
                  <Mail size={16} /> {profile.email}
                </span>
                <ArrowUpRight size={16} />
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-background/80 hover:text-background"
                >
                  LinkedIn <ArrowUpRight size={14} />
                </a>
                <span className="h-3 w-px bg-background/30" />
                <a
                  href={profile.cvUrl}
                  className="inline-flex items-center gap-1.5 text-sm text-background/80 hover:text-background"
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
