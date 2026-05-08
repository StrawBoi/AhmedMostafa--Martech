import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { projects as allProjects } from "@/lib/data";

export default function ProjectPage({ project: projectProp, projectId }) {
  const project = projectProp || allProjects.find((p) => p.id === projectId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!project) return null;

  const openImage = (i) => {
    setCurrentIndex(i || 0);
    setLightboxOpen(true);
  };

  return (
    <main data-testid={`case-study-${project.id}`} className="pt-10 md:pt-16 pb-24">
      {/* Hero */}
      <section className="container-editorial pb-8">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6">
          ← All projects
        </Link>

        <p className="overline mb-3">{project.type}</p>
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-4xl">
            {project.title}
          </h1>
          <div className="flex gap-2">
            {(project.labels || []).map((l) => (
              <span key={l} className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">
                {l}
              </span>
            ))}
          </div>
        </div>

        {project.subtitle && <p className="mt-6 text-foreground/75 max-w-3xl leading-relaxed">{project.subtitle}</p>}
      </section>

      {/* Summary strip */}
      {project.shortSummary && (
        <section className="bg-surface py-6">
          <div className="container-editorial">
            <p className="text-base md:text-lg font-medium text-foreground/85">{project.shortSummary}</p>
          </div>
        </section>
      )}

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
                          <img src={project.gallery?.[currentIndex]?.src} alt={project.gallery?.[currentIndex]?.alt} className="w-full h-[70vh] object-contain" />
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
