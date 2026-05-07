import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";

export default function Footer() {
  const onLinkedIn = () => track(Events.LINKEDIN_CLICKED, { source: "footer" });

  return (
    <footer
      data-testid="site-footer"
      className="border-t border-hairline mt-24 md:mt-32"
    >
      <div className="container-editorial py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="overline mb-4">Ahmed Mostafa</p>
          <p className="font-serif text-2xl md:text-3xl tracking-tight max-w-md leading-tight">
            Open to marketing, research and analytics internships across
            Belgium and Europe.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="overline mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="link-underline">Home</Link></li>
            <li><Link to="/projects" className="link-underline">Projects</Link></li>
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="overline mb-4">Reach me</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/contact"
                data-testid="footer-contact-link"
                className="link-underline"
              >
                Contact form
              </Link>
              <span className="text-subtle"> — replies within 48h</span>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                onClick={onLinkedIn}
                data-testid="footer-linkedin"
                className="inline-flex items-center gap-1.5 link-underline"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
            </li>
            <li>
              <CVButton
                variant="footer"
                source="footer"
                testId="footer-download-cv"
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-editorial py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-subtle">
          <p>© {new Date().getFullYear()} Ahmed Mostafa. Built in Brussels.</p>
          <p className="font-mono uppercase tracking-overline">
            Available — Summer 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
