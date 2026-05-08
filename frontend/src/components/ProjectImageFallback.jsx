import PropTypes from "prop-types";

/**
 * ProjectImageFallback
 *
 * Elegant, project-specific editorial cover that displays when an image fails to load.
 * Each fallback is styled to match the project's tone and content.
 *
 * Props:
 *   - projectId: 'volvo-belgium-campaign' | 'cinematek-decades-of-cinema'
 *   - title: project title for display
 *   - type: project type badge
 *   - theme: project-specific CSS class namespace
 */
export default function ProjectImageFallback({
  projectId,
  title,
  type,
  theme = "default",
}) {
  const projectThemes = {
    "volvo-belgium-campaign": {
      bgColor: "#1a1a1e",
      accentColor: "#d4a574",
      tagline: "Strategic positioning for local relevance",
    },
    "cinematek-decades-of-cinema": {
      bgColor: "#f7f7f9",
      accentColor: "#6b5b95",
      tagline: "Narrative framing across cultural decades",
    },
  };

  const themeConfig = projectThemes[projectId] || projectThemes.default;

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundColor: themeConfig.bgColor,
        aspectRatio: "16 / 10",
      }}
      role="img"
      aria-label={`${title} — project cover unavailable`}
    >
      {/* Subtle background texture effect */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div className="relative z-10 text-center px-8 space-y-6 max-w-2xl">
        {/* Type badge */}
        <div
          className="inline-block text-xs uppercase tracking-widest font-mono px-3 py-1 border"
          style={{
            borderColor: themeConfig.accentColor,
            color: themeConfig.accentColor,
          }}
        >
          {type}
        </div>

        {/* Project title */}
        <h3
          className="font-serif text-4xl md:text-5xl leading-tight tracking-tight"
          style={{
            color:
              projectId === "volvo-belgium-campaign"
                ? themeConfig.accentColor
                : "#1a1a1e",
          }}
        >
          {title}
        </h3>

        {/* Thematic tagline */}
        <p
          className="text-sm md:text-base font-light leading-relaxed"
          style={{
            color:
              projectId === "volvo-belgium-campaign"
                ? "rgba(255,255,255,0.6)"
                : "rgba(0,0,0,0.5)",
          }}
        >
          {themeConfig.tagline}
        </p>

        {/* Subtle accent line */}
        <div
          className="h-px w-12 mx-auto"
          style={{ backgroundColor: themeConfig.accentColor, opacity: 0.4 }}
          aria-hidden="true"
        />

        {/* Call to action prompt */}
        <p
          className="text-xs tracking-overline font-mono"
          style={{
            color:
              projectId === "volvo-belgium-campaign"
                ? "rgba(255,255,255,0.4)"
                : "rgba(0,0,0,0.3)",
          }}
        >
          View case study
        </p>
      </div>
    </div>
  );
}

ProjectImageFallback.propTypes = {
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  theme: PropTypes.string,
};
