import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProjectImageFallback from "@/components/ProjectImageFallback";
import { MetadataBadge, MetadataRow, TagGroup, PillarBadges } from "@/components/ui/MetadataBadge";
import { projects as allProjects } from "@/lib/data";

// Helper to detect status semantic type
function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

export default function ProjectPage({ project: projectProp, projectId }) {
  const project = projectProp || allProjects.find((p) => p.id === projectId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImageError, setLightboxImageError] = useState(false);

  useEffect(() => {
    setLightboxImageError(false);
  }, [currentIndex, lightboxOpen]);

  if (!project) return null;

  const openImage = (i) => {
    setCurrentIndex(i || 0);
    setLightboxOpen(true);
  };

  return (
    <main data-testid={`case-study-${project.id}`} className="pt-10 md:pt-16 pb-24">
      {/* Hero */}
      <section className="container-editorial pb-12">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6 reveal">
          ← All projects
        </Link>

        {/* Type eyebrow */}
        <p className="overline mb-3 reveal">{project.type}</p>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-4xl reveal">
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
              { label: "Status", value: <MetadataBadge variant="status" statusType={detectStatusType(project.status)}>{project.status}</MetadataBadge> },
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
        {project.subtitle && (
          <p className="mt-6 text-base md:text-lg text-foreground/80 leading-relaxed max-w-3xl font-medium reveal" style={{ transitionDelay: "320ms" }}>
            {project.subtitle}
          </p>
        )}
      </section>

      {/* Main content */}
      <section className="container-editorial py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            {project.overview && (
              <div className="reveal">
                <p className="overline mb-3">Overview</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.overview}</p>
              </div>
            )}

            {project.problem && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Problem</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.problem}</p>
              </div>
            )}

            {project.goal && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Goal</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.goal}</p>
              </div>
            )}

            {project.contribution && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Role</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.contribution}</p>
              </div>
            )}

            {(project.researchAndStrategy || (project.methods && project.methods.length > 0)) && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Strategy</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.researchAndStrategy || project.methods.join(", ")}</p>
              </div>
            )}

            {project.outcomes && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Outcomes</p>
                <p className="text-lg leading-relaxed text-foreground/85">{project.outcomes}</p>
              </div>
            )}

            {(project.tools && project.tools.length > 0) && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Tools & methods</p>
                <p className="text-base text-foreground/85"><strong>Tools:</strong> {project.tools.join(", ")}</p>
                {project.methods && <p className="text-base text-foreground/85 mt-2"><strong>Methods:</strong> {project.methods.join(", ")}</p>}
              </div>
            )}
          </div>

          {/* Aside: project facts + gallery */}
          <aside className="lg:col-span-4">
            <div className="reveal">
              <p className="overline mb-3">Project facts</p>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-foreground/85">
                {project.primaryPillar && (
                  <div>
                    <dt className="text-subtle">Primary pillar</dt>
                    <dd>{project.primaryPillar}</dd>
                  </div>
                )}
                {project.secondaryPillar && (
                  <div>
                    <dt className="text-subtle">Secondary pillar</dt>
                    <dd>{project.secondaryPillar}</dd>
                  </div>
                )}
                {project.tags && (
                  <div>
                    <dt className="text-subtle">Tags</dt>
                    <dd>{project.tags.slice(0, 6).join(", ")}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-subtle">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              </dl>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-10 reveal">
                <p className="overline mb-3">Image gallery</p>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openImage(i)}
                      className="bg-surface overflow-hidden block focus:outline-none"
                      aria-label={`Open image ${i + 1}`}
                    >
                      <img src={img.src} alt={img.alt || `Gallery image ${i + 1}`} className="w-full h-48 object-cover" />
                      {img.caption && <figcaption className="p-2 text-sm text-subtle">{img.caption}</figcaption>}
                    </button>
                  ))}
                </div>

                <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                  <DialogContent className="max-w-6xl p-0 bg-transparent shadow-none">
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/80" onClick={() => setLightboxOpen(false)} />
                      <div className="relative max-w-5xl w-full mx-4">
                        <button
                          onClick={() => setLightboxOpen(false)}
                          className="absolute right-3 top-3 bg-white/10 rounded-full p-2 text-white"
                          aria-label="Close"
                        >
                          ✕
                        </button>

                        <div className="bg-black rounded">
                          {!lightboxImageError && project.gallery?.[currentIndex]?.src ? (
                            <img
                              src={project.gallery[currentIndex].src}
                              alt={project.gallery?.[currentIndex]?.alt || project.title}
                              onError={() => setLightboxImageError(true)}
                              className="w-full h-[70vh] object-contain"
                            />
                          ) : (
                            <ProjectImageFallback
                              projectId={project.id}
                              title={project.title}
                              type={project.type}
                            />
                          )}
                          {project.gallery?.[currentIndex]?.caption && (
                            <div className="p-3 text-sm text-subtle bg-background">{project.gallery[currentIndex].caption}</div>
                          )}
                        </div>

                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <button
                            onClick={() => setCurrentIndex((idx) => (idx - 1 + project.gallery.length) % project.gallery.length)}
                            className="rounded-full bg-white/10 p-3 text-white"
                            aria-label="Previous image"
                          >
                            ‹
                          </button>
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <button
                            onClick={() => setCurrentIndex((idx) => (idx + 1) % project.gallery.length)}
                            className="rounded-full bg-white/10 p-3 text-white"
                            aria-label="Next image"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

ProjectPage.propTypes = {
  project: PropTypes.object,
  projectId: PropTypes.string,
};
