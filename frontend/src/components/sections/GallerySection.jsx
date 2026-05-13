import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const POSTER_CATEGORIES = new Set(["strategy", "research", "planning", "marketing"]);

function isScreenshotItem(item) {
  const category = String(item?.category || "").toLowerCase();
  return ["product", "ui", "dashboard", "interface", "screen", "screenshot", "cover"].some((term) => category.includes(term));
}

function getItemTone(item) {
  const category = String(item?.category || "").toLowerCase();
  const screenshot = isScreenshotItem(item);

  if (screenshot) {
    return {
      tileClass: "",
      mediaClass: "aspect-[16/10]",
      imageClass: "object-contain p-4",
    };
  }

  return {
    tileClass: "",
    mediaClass: "aspect-[4/5]",
    imageClass: "object-cover",
  };
}

function EmptyState({ category, title, body, label }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background p-5 md:p-6 text-center">
      <span className="inline-flex items-center rounded-full border border-hairline bg-surface px-3 py-1 text-xs uppercase tracking-[0.16em] text-subtle">
        {category}
      </span>
      <h3 className="max-w-[14ch] font-serif text-2xl leading-tight text-foreground">{title}</h3>
      <div className="mt-1 max-w-sm rounded-xl border border-dashed border-hairline bg-surface/70 px-4 py-3">
        <p className="text-base leading-relaxed text-foreground/70">{body}</p>
      </div>
      <p className="text-xs uppercase tracking-[0.16em] text-subtle">{label}</p>
    </div>
  );
}

export default function GallerySection({
  items = [],
  title = "Gallery",
  intro,
  introNote = "Click any frame to enlarge it. On mobile, swipe through the modal to move between visuals.",
  emptyStateTitle = "No visuals yet",
  emptyStateBody = "This frame is ready for the final image or screenshot asset.",
  emptyStateLabel = "Placeholder visual",
  modalEmptyStateTitle = "No visual available",
  modalEmptyStateBody = "This slot is ready for the final poster or screenshot asset.",
  modalEmptyStateLabel = "Placeholder visual",
  sidebarTitle = "Notes",
  sidebarBody,
  sidebarDetails = [],
}) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const galleryItems = items.length ? items : [{ category: "visual" }];
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

  if (!galleryItems.length) return null;

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
          <div className="max-w-2xl">
            <p className="overline mb-3">{title}</p>
            {intro && <p className="text-base leading-relaxed text-foreground/75">{intro}</p>}
          </div>
          <p className="text-sm text-subtle max-w-md md:text-right">{introNote}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[1fr]">
          {galleryItems.map((item, index) => {
            const tone = getItemTone(item);
            const hasError = Boolean(imageErrors[index]);
            const itemTitle = item.caption || item.alt || `Visual ${index + 1}`;
            const category = item.category || "visual";

            return (
              <button
                key={`${item.caption || item.alt || index}`}
                type="button"
                onClick={() => {
                  setCurrentIndex(index);
                  setOpen(true);
                }}
                className={`group text-left border border-hairline bg-surface overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/70 shadow-sm rounded-xl ${tone.tileClass}`}
                aria-label={`Open ${itemTitle}`}
              >
                <div className={`${tone.mediaClass} relative bg-background/60`}>
                  {item.src && !hasError ? (
                    <img
                      src={item.src}
                      alt={item.alt || itemTitle}
                      className={`h-full w-full ${tone.imageClass} transition-transform duration-500 group-hover:scale-[1.02]`}
                      onError={() => setImageErrors((prev) => ({ ...prev, [index]: true }))}
                    />
                  ) : (
                    <EmptyState category={category} title={itemTitle} body={emptyStateBody} label={emptyStateLabel} />
                  )}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-hairline bg-background/80 px-2.5 py-1 text-xs uppercase tracking-[0.16em] text-foreground">
                        {category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-foreground">
                        <ZoomIn size={12} /> Open
                      </span>
                    </div>
                    {item.caption && <p className="mt-3 max-w-[28ch] text-base text-foreground">{item.caption}</p>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

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
                            <p className="text-xs uppercase tracking-[0.18em] text-subtle">{modalEmptyStateLabel}</p>
                            <h3 className="mt-3 font-serif text-3xl text-foreground">
                              {activeItem?.caption || activeItem?.alt || modalEmptyStateTitle}
                            </h3>
                            <p className="mt-4 text-base leading-relaxed text-foreground/70">{modalEmptyStateBody}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <aside className="border-t border-hairline bg-surface p-5 lg:border-t-0 lg:border-l">
                      <p className="overline mb-3">{sidebarTitle}</p>
                      <p className="text-base leading-relaxed text-foreground/75">
                        {sidebarBody || activeItem?.caption || "No caption provided."}
                      </p>
                      <div className="mt-6 space-y-3 text-foreground/75">
                        {sidebarDetails.length > 0 ? (
                          sidebarDetails.map((detail) => (
                            <div key={detail.label}>
                              <p className="text-xs uppercase tracking-[0.18em] text-subtle">{detail.label}</p>
                              <p className="mt-1 text-base leading-relaxed text-foreground">{detail.value}</p>
                            </div>
                          ))
                        ) : (
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-subtle">Category</p>
                            <p className="mt-1 text-base leading-relaxed text-foreground">{activeItem?.category || "visual"}</p>
                          </div>
                        )}
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

GallerySection.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
      category: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  intro: PropTypes.string,
  introNote: PropTypes.string,
  emptyStateTitle: PropTypes.string,
  emptyStateBody: PropTypes.string,
  emptyStateLabel: PropTypes.string,
  modalEmptyStateTitle: PropTypes.string,
  modalEmptyStateBody: PropTypes.string,
  modalEmptyStateLabel: PropTypes.string,
  sidebarTitle: PropTypes.string,
  sidebarBody: PropTypes.string,
  sidebarDetails: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
