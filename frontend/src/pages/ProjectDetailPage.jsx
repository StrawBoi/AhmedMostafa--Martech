import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { allProjects } from "@/lib/data";
import { MetadataBadge, MetadataRow, TagGroup } from "@/components/ui/MetadataBadge";

// Helper to detect status semantic type
function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

export default function ProjectDetailPage() {
  useReveal();
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="container-editorial py-32 text-center" data-testid="project-not-found">
        <p className="overline mb-4">404</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          That case study isn't published yet.
        </h1>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-8 link-underline">
          <ArrowLeft size={14} /> Back to all projects
        </Link>
      </main>
    );
  }

  const idx = allProjects.findIndex((p) => p.slug === slug);
  const next = allProjects[(idx + 1) % allProjects.length];

  return (
    <main data-testid={`case-study-${project.slug}`} className="pt-10 md:pt-16">
      <section className="container-editorial pb-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6 reveal"
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        {/* Type eyebrow */}
        <p className="overline mb-3 reveal">{project.type}</p>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-5xl reveal">
          {project.title}
        </h1>

        {/* Labels (trust cues) */}
        {(project.labels || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 reveal" style={{ transitionDelay: "80ms" }}>
            {project.labels.map((l) => (
              <MetadataBadge key={l} variant="label">{l}</MetadataBadge>
            ))}
          </div>
        )}

        {/* Metadata row: Role, Status, Year */}
        <div className="mt-6 reveal" style={{ transitionDelay: "160ms" }}>
          <MetadataRow
            items={[
              { label: "Role", value: project.role, emphasis: true },
              { label: "Status", value: <MetadataBadge variant="status" statusType={detectStatusType(project.status || "Draft")}>{project.status || "Draft"}</MetadataBadge> },
              { label: "Year", value: project.year },
            ]}
            containerClassName="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm"
          />
        </div>

        {/* Top tags (2-3 high priority) */}
        {(project.tags || []).length > 0 && (
          <div className="mt-6 reveal" style={{ transitionDelay: "240ms" }}>
            <p className="overline mb-3">Focus areas</p>
            <TagGroup tags={project.tags} variant="card" />
          </div>
        )}

        {/* Short takeaway/value statement */}
        {project.takeaway && (
          <p className="mt-6 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl font-medium reveal" style={{ transitionDelay: "320ms" }}>
            {project.takeaway}
          </p>
        )}
      </section>

      <section className="reveal">
        <div className="container-editorial">
          <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="overline mb-3 reveal">The takeaway</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug text-terracotta reveal">
            {project.takeaway}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-10">
          <div className="reveal">
            <p className="overline mb-3">Challenge</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {project.challenge}
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <p className="overline mb-3">Overview</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {project.overview || project.contribution || "Overview coming soon."}
            </p>
          </div>

          {project.deliverables && project.deliverables.length > 0 && (
            <div className="reveal" style={{ transitionDelay: "160ms" }}>
              <p className="overline mb-3">Deliverables</p>
              <ul className="list-disc pl-5 text-lg leading-relaxed text-foreground/85">
                {project.deliverables.map((d) => (
                  <li key={d} className="mb-2">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p className="overline mb-3">Outcome</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {project.takeaway} The detailed numbers, screenshots, and
              stakeholder takeaways live in the full case study — available on
              request via the contact form.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="container-editorial py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={`/projects/${next.slug}`}
            data-testid="next-case-study"
            className="group block"
          >
            <p className="overline mb-3">Next case study</p>
            <p className="font-serif text-2xl md:text-3xl tracking-tight transition-colors group-hover:text-terracotta">
              {next.title}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium link-underline">
              Read next <ArrowUpRight size={14} />
            </span>
          </Link>
          <div className="md:text-right">
            <p className="overline mb-3">Want the full version?</p>
            <p className="font-serif text-2xl md:text-3xl tracking-tight">
              I'm happy to walk you through it.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium link-underline"
            >
              Open the contact form <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
