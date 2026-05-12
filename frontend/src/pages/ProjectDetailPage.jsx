import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import useReveal from "@/hooks/useReveal";
import { allProjects } from "@/lib/data";
import BackLink from "@/components/shared/BackLink";
import SectionIntro from "@/components/shared/SectionIntro";
import StatsStrip from "@/components/shared/StatsStrip";
import ClosingNote from "@/components/shared/ClosingNote";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  buildPositioningRows,
  buildSignalItems,
  CaseStudyDeliverablesGrid,
  CaseStudyPositioningTable,
} from "@/components/sections/CaseStudyRhythm";

function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

// Hero Gallery Component
function HeroGallery({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [scrollContainer, setScrollContainer] = useState(null);

  const galleryItems = items.length ? items : [];
  const activeItem = galleryItems[currentIndex];
  const canNavigate = galleryItems.length > 1;

  useEffect(() => {
    setImageErrors({});
  }, [currentIndex, open]);

  useEffect(() => {
    if (!open || galleryItems.length < 2) return;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((index) => (index + 1) % galleryItems.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryItems.length, open]);

  const touchHandlers = useMemo(
    () => ({
      onTouchStart: (event) => setTouchStartX(event.touches[0]?.clientX ?? null),
      onTouchMove: (event) => setTouchEndX(event.touches[0]?.clientX ?? null),
      onTouchEnd: () => {
        if (touchStartX === null || touchEndX === null || galleryItems.length < 2) {
          setTouchStartX(null);
          setTouchEndX(null);
          return;
        }

        const delta = touchStartX - touchEndX;
        const threshold = 48;

        if (Math.abs(delta) > threshold) {
          if (delta > 0) {
            setCurrentIndex((index) => (index + 1) % galleryItems.length);
          } else {
            setCurrentIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
          }
        }

        setTouchStartX(null);
        setTouchEndX(null);
      },
    }),
    [galleryItems.length, touchEndX, touchStartX],
  );

  if (!galleryItems.length) {
    return null;
  }

  return (
    <section className="reveal section-vertical">
      <div className="container-editorial">
        {/* Main Hero Image */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group w-full overflow-hidden bg-surface hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/70"
        >
          <div className="aspect-[16/9] w-full relative bg-background/60">
            {activeItem?.src && !imageErrors[0] ? (
              <img
                src={activeItem.src}
                alt={activeItem.alt || activeItem.caption || "Project hero image"}
                className="h-full w-full object-cover"
                onError={() => setImageErrors((prev) => ({ ...prev, [0]: true }))}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background/40">
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-foreground/40">
                  <ZoomIn size={12} /> Click to view
                </span>
              </div>
            )}
          </div>
        </button>

        {/* Thumbnail Strip */}
        {canNavigate && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2" ref={setScrollContainer}>
            {galleryItems.map((item, index) => {
              const isActive = index === currentIndex;
              const hasError = Boolean(imageErrors[index]);

              return (
                <button
                  key={`thumbnail-${index}`}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  className={`flex-shrink-0 overflow-hidden border-2 transition-all ${
                    isActive
                      ? "border-terracotta shadow-md"
                      : "border-hairline hover:border-foreground/30"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <div className="aspect-[4/3] w-20 md:w-24 bg-background/60">
                    {item.src && !hasError ? (
                      <img
                        src={item.src}
                        alt={item.alt || item.caption || `Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={() => setImageErrors((prev) => ({ ...prev, [index]: true }))}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-surface text-xs text-foreground/40">
                        No image
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-transparent border-0 shadow-none">
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
            <div className="relative z-10 w-full max-w-6xl" {...touchHandlers}>
              <div className="overflow-hidden rounded-2xl border border-hairline bg-background shadow-2xl">
                <div className="flex items-center justify-between border-b border-hairline px-5 py-4 text-sm text-foreground/75">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-subtle">{activeItem?.category || "visual"}</p>
                    <p className="mt-1 text-sm text-foreground">{activeItem?.caption || activeItem?.alt || "Project visual"}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-subtle">
                    {currentIndex + 1} / {galleryItems.length}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="relative min-h-[68svh] bg-background">
                    {canNavigate && (
                      <>
                        <button
                          type="button"
                          onClick={() => setCurrentIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length)}
                          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-hairline bg-background/85 p-3 text-foreground transition hover:bg-surface shadow-sm"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentIndex((index) => (index + 1) % galleryItems.length)}
                          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-hairline bg-background/85 p-3 text-foreground transition hover:bg-surface shadow-sm"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {activeItem?.src && !imageErrors[currentIndex] ? (
                      <img
                        src={activeItem.src}
                        alt={activeItem.alt || activeItem.caption || `Gallery image ${currentIndex + 1}`}
                        className="h-full w-full max-h-[68svh] object-contain p-4 sm:p-6"
                        onError={() => setImageErrors((prev) => ({ ...prev, [currentIndex]: true }))}
                      />
                    ) : (
                      <div className="flex min-h-[68svh] items-center justify-center bg-surface px-8 text-center">
                        <div className="max-w-xl">
                          <p className="text-xs uppercase tracking-[0.18em] text-subtle">Placeholder visual</p>
                          <h3 className="mt-3 font-serif text-3xl text-foreground">
                            {activeItem?.caption || activeItem?.alt || "No visual available"}
                          </h3>
                          <p className="mt-4 text-base leading-relaxed text-foreground/70">This slot is ready for the final poster or screenshot asset.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
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
        <BackLink />
      </main>
    );
  }

  const idx = allProjects.findIndex((p) => p.slug === slug);
  const next = allProjects[(idx + 1) % allProjects.length];
  const positioningRows = buildPositioningRows(project);
  const deliverableItems = project.deliverables || project.methods || project.tools || [];

  return (
    <main data-testid={`case-study-${project.slug}`} className="pt-10 md:pt-16">
      <section className="container-editorial section-vertical">
        <SectionIntro project={project} />
      </section>

      <StatsStrip items={buildSignalItems(project)} />

      {/* Hero Gallery - Shows first image as hero + thumbnail strip */}
      <HeroGallery items={project.gallery || []} />

      <section className="container-editorial section-vertical grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="overline mb-3 reveal">The work</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug text-terracotta reveal">
            {project.takeaway}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-8">
          {project.challenge && (
            <div className="reveal">
              <p className="overline mb-3">What the challenge was</p>
              <p className="text-base leading-relaxed text-foreground/85">
                {project.challenge}
              </p>
            </div>
          )}
          {(project.overview || project.contribution) && (
            <div className="reveal" style={{ transitionDelay: "100ms" }}>
              <p className="overline mb-3">What we did</p>
              <p className="text-base leading-relaxed text-foreground/85">
                {project.overview || project.contribution}
              </p>
            </div>
          )}
        </div>
      </section>

      <CaseStudyPositioningTable rows={positioningRows} title="Positioning table" />
      <CaseStudyDeliverablesGrid items={deliverableItems} />
      <ClosingNote title="Want the full version?" body="I'm happy to walk you through it." />

      <section className="border-t border-hairline">
        <div className="container-editorial py-16">
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
        </div>
      </section>
    </main>
  );
}
