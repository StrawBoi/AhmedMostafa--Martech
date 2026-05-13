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
  // Prefer explicit heroImage set on the project data, fallback to known mapping
  const project = allProjects.find((p) => p.slug === slug);
  if (project && project.heroImage) return project.heroImage;

  const imageMap = {
    "volvo-belgium-campaign": "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
    "cinematek-decades-of-cinema": "/projects/cinematek/cinematek-campaign-board-mockup.png",
    "marketing-intelligence-analysis": "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
  };

  return imageMap[slug] || null;
}

export default function ProjectsPage() {
  useReveal();
  // Custom display content for page-level rewrites (warmer tone + consistent meta)
  const displayOverrides = {
    "mosol-profit-intelligence": {
      title: "MOSOL — Turning POS Data into Profit Intelligence",
      description:
        "A product strategy concept for the Belgian horeca market, built around positioning, market analysis, and early go-to-market thinking. The project explored how better visibility into POS data could support clearer decisions around profitability, forecasting, and day-to-day operations.",
      meta: "Research & Positioning • 2025 • Product Thinking",
      typeContext: "Strategy Concept / Self-Initiated",
    },
    "volvo-belgium-campaign": {
      title: "Volvo Belgium — Made in Belgium Campaign Strategy",
      description:
        "A campaign strategy project shaped around audience insight, positioning, and communication structure. It focused on building a direction that connected research, storytelling, and brand relevance in a more grounded and coherent way.",
      meta: "Campaign Strategy • 2025 • Brand Communication",
      typeContext: "Campaign Proposal / University Project",
    },
    "cinematek-decades-of-cinema": {
      title: "CINEMATEK — Decades of Cinema Campaign",
      description:
        "A cultural campaign concept developed through editorial thinking, audience awareness, and communication design. The project brought together campaign identity, platform direction, and content structure in a way that aimed to feel both expressive and well organised.",
      meta: "Brand & Communication • 2025 • Campaign Thinking",
      typeContext: "Campaign Proposal / University Project",
    },
    "tackle-pricing-intelligence": {
      title: "Tackle — Pricing Intelligence",
      description:
        "An interactive concept exploring how pricing data can be translated into clearer commercial signals. It focused on identifying friction points, shaping a more useful workflow, and making operational information easier to act on.",
      meta: "Interface & Insight • 2025 • Execution",
      typeContext: "Concept Project / Self-Initiated",
    },
    "marketing-intelligence-analysis": {
      title: "Marketing Intelligence & Analysis",
      description:
        "A concept project centred on how analytics interfaces can support clearer strategic thinking. It combined reporting, visual structure, and insight-led design to explore how data can become more useful in day-to-day decision-making.",
      meta: "Analytics & Execution • 2025 • Research-Led",
      typeContext: "Concept Project / Applied Concept",
    },
    "brand-identity-transformation": {
      title: "Vantier — Brand Identity Transformation",
      description:
        "A luxury brand transformation concept built to move Vantier from fragmented visuals to a more cohesive and timeless identity system.",
      meta: "Brand & Communication • 2025 • Strategic Thinking",
      typeContext: "Framework / Self-Initiated",
    },
  };

  return (
    <main data-testid="projects-page" className="pt-12 md:pt-20">
      <section className="container-editorial pb-16 md:pb-24">
        <p className="overline mb-5 reveal">PROJECT ARCHIVE</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] reveal">
          Work that brings together <span className="italic text-terracotta">research</span>,
          <br />
          campaigns, and execution.
        </h1>
        <p
          className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed reveal"
          style={{ transitionDelay: "120ms" }}
        >
          A growing collection of case studies that reflect how I like to work: understanding the context, shaping a clear direction, and turning it into something concrete. Some projects are more strategic, some more visual, and some more hands-on, but all of them show how I think and work.
        </p>
        <p className="mt-4 text-sm text-foreground/70">A broader view of the work behind the homepage.</p>
      </section>

      <section className="container-editorial pb-32">
        <ul className="border-t border-hairline">
          {allProjects.map((p, i) => {
            const override = displayOverrides[p.slug] || {};
            const title = override.title || p.title;
            const description = override.description || p.shortSummary || p.overview || "";
            const meta = override.meta || `${p.role || "Contribution"} • ${p.year || "Year"} • ${p.primaryPillar || "Area"}`;
            const typeContext = override.typeContext || `${p.type || "Type"} / ${p.status || "Context"}`;

            return (
              <li
                key={p.slug}
                data-testid={`project-row-${p.slug}`}
                className="reveal py-4 md:py-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Link
                  to={`/projects/${p.slug}`}
                  className="group block transition-colors"
                >
                  <div className="overflow-hidden rounded-2xl border border-hairline bg-background shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-shadow group-hover:shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]">
                      <div className="relative w-full bg-surface/60 md:border-r md:border-hairline">
                        <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-foreground/6 to-foreground/12">
                        {getThumbnailImage(p.slug) ? (
                          <img
                            src={getThumbnailImage(p.slug)}
                            alt={`${p.title} thumbnail`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-xs font-medium text-foreground/40">Project image</span>
                          </div>
                        )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-6 md:gap-6 md:p-7 lg:p-8">
                        <span className="flex-shrink-0 font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>

                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-subtle">
                            <span className="inline-flex rounded-full border border-hairline bg-foreground/5 px-3 py-1 text-[12px] text-foreground/70">
                              {typeContext}
                            </span>
                            <span className="inline-flex rounded-full border border-hairline bg-background px-3 py-1 text-[12px] text-subtle">
                              {meta}
                            </span>
                          </div>

                          <h2 className="mb-3 font-serif text-2xl leading-tight tracking-tight transition-colors group-hover:text-terracotta md:text-[2rem]">
                            {title}
                          </h2>

                          <p className="max-w-3xl text-sm leading-relaxed text-foreground/80 md:text-base">
                            {description}
                          </p>

                          <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-terracotta">
                            Read case study
                            <ArrowUpRight size={14} className="flex-shrink-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
