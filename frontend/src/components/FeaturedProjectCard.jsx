import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { projects } from "@/lib/data";

export default function FeaturedProjectCard({ projectId, project: projectProp, dominant = false }) {
  const project = projectProp || projects.find((p) => p.id === projectId);
  if (!project) return null;

  return (
    <article
      className={`group block bg-background border border-hairline rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        dominant ? "" : ""
      }`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="w-full bg-surface">
        {project.heroImage && (
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-44 object-cover"
          />
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-xs text-subtle">{project.type}</p>
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
          {(project.labels || []).map((l) => (
            <span key={l} className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">{l}</span>
          ))}
        </div>

        <p className="mt-4 text-sm md:text-base text-foreground/85 leading-relaxed" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
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

          <div className="ml-auto text-sm text-subtle hidden md:block">{project.primaryPillar}</div>
        </div>
      </div>
    </article>
  );
}

FeaturedProjectCard.propTypes = {
  projectId: PropTypes.string,
  project: PropTypes.object,
  dominant: PropTypes.bool,
};
