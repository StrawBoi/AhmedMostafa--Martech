import { Link } from "react-router-dom";
import { projects } from "@/lib/data";

export default function FeaturedProjectCardCinematek({ project: projectProp }) {
  const project =
    projectProp || projects.find((p) => p.id === "cinematek-decades-of-cinema");

  if (!project) return null;

  return (
    <article
      data-testid="featured-cinematek-card"
      className="group block bg-background border border-hairline rounded-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="w-full bg-surface">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <p className="text-xs text-subtle">{project.type}</p>
            <div className="mt-2 flex gap-2 flex-wrap">
              {(project.labels || []).map((l) => (
                <span key={l} className="text-xs uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">{l}</span>
              ))}
            </div>
          </div>
          <div className="text-sm text-subtle">{project.year}</div>
        </div>

        <h3 id={`project-${project.id}-title`} className="font-serif text-xl md:text-2xl leading-tight group-hover:text-terracotta">
          {project.title}
        </h3>

        {project.subtitle && (
          <p className="mt-2 text-sm text-foreground/75">{project.subtitle}</p>
        )}

        {project.role && (
          <p className="mt-2 text-sm text-subtle">{project.role}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.primaryPillar && (
            <span className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">{project.primaryPillar}</span>
          )}
          {project.secondaryPillar && (
            <span className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">{project.secondaryPillar}</span>
          )}
        </div>

        <p className="mt-4 text-sm md:text-base text-foreground/85 leading-relaxed" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
          {project.shortSummary}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="btn-primary inline-flex items-center gap-2"
            aria-label={`Read case study: ${project.title}`}
          >
            Read case study
          </Link>

          <div className="ml-auto text-sm text-subtle hidden md:block">{project.type}</div>
        </div>
      </div>
    </article>
  );
}
