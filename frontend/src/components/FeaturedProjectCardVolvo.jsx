import { Link } from "react-router-dom";
import { projects } from "@/lib/data";

export default function FeaturedProjectCardVolvo({ project: projectProp }) {
  const project =
    projectProp || projects.find((p) => p.id === "volvo-belgium-campaign");

  if (!project) return null;

  return (
    <article
      data-testid="featured-volvo-card"
      className="group block bg-background border border-hairline rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="w-full bg-surface">
        <img
          src={project.heroImage}
          alt={project.heroImage ? project.title : "Volvo project placeholder"}
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="overline text-subtle">{project.type}</p>
          <span className="text-xs uppercase tracking-overline bg-foreground/5 text-foreground px-2 py-1 rounded">Strategic Proposal</span>
        </div>

        <h3 id={`project-${project.id}-title`} className="font-serif text-xl md:text-2xl leading-tight group-hover:text-terracotta">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="mt-2 text-sm text-foreground/75">{project.subtitle}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.primaryPillar && (
            <span className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">
              {project.primaryPillar}
            </span>
          )}
          {project.secondaryPillar && (
            <span className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">
              {project.secondaryPillar}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm md:text-base text-foreground/85 leading-relaxed">{project.shortSummary}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="btn-primary inline-flex items-center gap-2"
            aria-label={`View case study: ${project.title}`}
          >
            View case study
          </Link>

          <div className="ml-auto text-sm text-subtle">{project.year}</div>
        </div>
      </div>
    </article>
  );
}
