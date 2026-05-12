/**
 * CaseStudyMediaSection
 * 
 * Reusable media evidence section for project case studies.
 * 
 * Layout: Option B — 2x2 grid
 * - Top row: 2 larger project/work visuals (h-80)
 * - Bottom row: 2 smaller presentation photos (h-64)
 * - Mobile: stacks into single column
 * 
 * Purpose:
 * - Lead with work/project visuals (proof of deliverables)
 * - Support with presentation photos (credibility + communication skill)
 * - Clear hierarchy: work > person
 * 
 * Props:
 * - title: section heading (e.g., "Project evidence")
 * - description: introductory text
 * - images: array of { src?, alt?, caption?, category ('work' | 'presentation') }
 */

import PropTypes from 'prop-types';

export default function CaseStudyMediaSection({ 
  title = "Project evidence",
  description = "A mix of project outputs and presentation moments that show both the work itself and how I communicated it.",
  images = [] 
}) {
  if (!images || images.length === 0) {
    return null; // Don't render if no images
  }

  // Separate work and presentation images
  const workImages = images.filter((img) => img.category === 'work').slice(0, 2);
  const presentationImages = images.filter((img) => img.category === 'presentation').slice(0, 2);

  // Only render if we have both types
  if (workImages.length === 0 || presentationImages.length === 0) {
    return null;
  }

  return (
    <section className="container-editorial py-12">
      <div className="reveal">
        <p className="overline mb-3">{title}</p>
        <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl mb-8">
          {description}
        </p>
      </div>

      {/* 2x2 Grid: Work visuals (top, larger) + Presentation photos (bottom, slightly smaller) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top row: Work/project visuals (2 items, larger) */}
        {workImages.map((img, idx) => (
          <div 
            key={`work-${idx}`}
            className="reveal overflow-hidden bg-surface"
            style={{ transitionDelay: `${(idx + 1) * 80}ms` }}
          >
            <figure className="flex flex-col h-full">
              {/* Image container with fixed aspect ratio */}
              <div className="relative w-full bg-surface overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || `Project visual ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-hairline text-subtle text-sm px-6 text-center">
                    Work visual coming soon
                  </div>
                )}
              </div>

              {/* Caption beneath image */}
              {img.caption && (
                <figcaption className="p-3 text-sm text-foreground/70 leading-relaxed border-t border-hairline">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          </div>
        ))}

        {/* Bottom row: Presentation photos (2 items, slightly smaller visual weight) */}
        {presentationImages.map((img, idx) => (
          <div 
            key={`presentation-${idx}`}
            className="reveal overflow-hidden bg-surface opacity-95"
            style={{ transitionDelay: `${(workImages.length + idx + 1) * 80}ms` }}
          >
            <figure className="flex flex-col h-full">
              {/* Image container with fixed aspect ratio (slightly smaller than work images) */}
              <div className="relative w-full bg-surface overflow-hidden" style={{ aspectRatio: '16/10' }}>
                {img.src ? (
                  <img
                    src={img.src}
                    alt={img.alt || `Presentation photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-hairline text-subtle text-sm px-6 text-center">
                    Presentation photo to add
                  </div>
                )}
              </div>

              {/* Caption beneath image */}
              {img.caption && (
                <figcaption className="p-3 text-sm text-foreground/70 leading-relaxed border-t border-hairline">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}

CaseStudyMediaSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    caption: PropTypes.string,
    category: PropTypes.oneOf(['work', 'presentation']).isRequired,
  })),
};
