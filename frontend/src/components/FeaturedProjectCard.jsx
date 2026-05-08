import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { projects } from "@/lib/data";
import ProjectImageFallback from "@/components/ProjectImageFallback";

export default function FeaturedProjectCard({ projectId, project: projectProp, dominant = false }) {
  const project = projectProp || projects.find((p) => p.id === projectId);
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article
      className={`group block bg-background border border-hairline rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        dominant ? "" : ""
      }`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="w-full bg-surface">
        {project.heroImage && !imageError ? (
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-44 object-cover"
            onError={handleImageError}
          />
        ) : (
          <ProjectImageFallback
            projectId={project.id}
            title={project.title}
            type={project.type}
          />
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-xs uppercase tracking-overline text-subtle">{project.type}</p>
          <div className="text-sm text-subtle">{project.year}</div>
        </div>

        <h3 id={`project-${project.id}-title`} className="font-serif text-xl md:text-2xl leading-tight group-hover:text-terracotta">
          {project.title}
        </h3>

        {project.status ? (
          <p className="mt-2 text-xs uppercase tracking-overline text-subtle">
            {project.status}
          </p>
        ) : null}

        <p className="mt-4 text-sm md:text-base text-foreground/85 leading-relaxed" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
          {project.shortSummary}
        </p>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-subtle">
          <div className="min-w-0 truncate">
            {project.role ? `Role: ${project.role}` : ""}
          </div>
          {project.primaryPillar ? (
            <span className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 whitespace-nowrap">
              {project.primaryPillar}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            to={`/projects/${project.id}`}
            className="btn-primary inline-flex items-center gap-2"
            aria-label={`Read case study: ${project.title}`}
          >
            Read case study
          </Link>
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
