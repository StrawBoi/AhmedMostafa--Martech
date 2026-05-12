import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { allProjects } from "@/lib/data";
import { MetadataBadge, PillarBadges } from "@/components/ui/MetadataBadge";

// Helper to detect status semantic type
function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

// Helper to get thumbnail image for project
function getThumbnailImage(slug) {
  const imageMap = {
    "mosol-horease-profit-intelligence": null,
    "volvo-belgium-campaign": "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
    "cinematek-decades-of-cinema": "/projects/cinematek/cinematek-campaign-board-mockup.png",
    "tackle-pricing-intelligence": null,
    "marketing-intelligence-analysis": "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
    "brand-identity-transformation": null,
  };
  return imageMap[slug] || null;
}

export default function ProjectsPage() {
  useReveal();
  return (
    <main data-testid="projects-page" className="pt-12 md:pt-20">
      <section className="container-editorial pb-16 md:pb-24">
        <p className="overline mb-5 reveal">All projects</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] reveal">
          Work that mixes <span className="italic text-terracotta">research</span>,
          <br />
          campaigns, and execution.
        </h1>
        <p
          className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed reveal"
          style={{ transitionDelay: "120ms" }}
        >
          A growing collection of case studies. Each one is short, structured,
          and written for someone trying to evaluate a candidate — not for
          design awards.
        </p>
      </section>

      <section className="container-editorial pb-32">
        <ul className="border-t border-hairline">
          {allProjects.map((p, i) => (
            <li
              key={p.slug}
              data-testid={`project-row-${p.slug}`}
              className="border-b border-hairline reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="group flex flex-col gap-4 py-7 md:py-10 transition-colors"
              >
                {/* Thumbnail Image Section */}
                <div className="mb-2 overflow-hidden rounded-sm bg-foreground/5">
                  {getThumbnailImage(p.slug) ? (
                    <img
                      src={getThumbnailImage(p.slug)}
                      alt={`${p.title} thumbnail`}
                      className="w-full h-48 md:h-56 object-cover group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-48 md:h-56 bg-gradient-to-br from-foreground/8 to-foreground/12 flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground/40">No image</span>
                    </div>
                  )}
                </div>

                {/* Top row: Index, Type, Title, CTA */}
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-mono text-xs text-subtle flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <MetadataBadge variant="type">{p.type}</MetadataBadge>
                      {p.status && (
                        <MetadataBadge 
                          variant="status" 
                          statusType={detectStatusType(p.status)}
                          className="text-[10px]"
                        >
                          {p.status}
                        </MetadataBadge>
                      )}
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight transition-colors group-hover:text-terracotta mb-2">
                      {p.title}
                    </h2>
                    {/* Outcome/value: recruiter-friendly one-liner */}
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl">
                      {p.takeaway}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-sm font-medium text-foreground/70 group-hover:text-terracotta transition-colors flex items-center gap-1.5 ml-2">
                    <ArrowUpRight size={14} className="flex-shrink-0" />
                  </div>
                </div>

                {/* Bottom row: Supporting metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ml-10 md:ml-12 text-xs text-subtle">
                  {p.role && (
                    <span className="inline-block">
                      <span className="font-medium">Role:</span> {p.role}
                    </span>
                  )}
                  {p.year && (
                    <span className="inline-block">
                      <span className="font-medium">Year:</span> {p.year}
                    </span>
                  )}
                  {p.primaryPillar && (
                    <div className="inline-block">
                      <PillarBadges primary={p.primaryPillar} variant="inline" />
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
