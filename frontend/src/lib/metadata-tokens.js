/**
 * Metadata Hierarchy System
 * 
 * Reusable tokens and styles for project metadata display.
 * Principles: recruiter-first, editorial, restrained warm accent, titles strong
 */

export const metadataTokens = {
  // Badge variants: neutral base with warm accent for emphasis
  badges: {
    // Project type/category — trust cue, understated
    projectType: {
      base: "text-xs uppercase tracking-overline px-2.5 py-1 text-subtle border border-hairline rounded",
      hover: "transition-colors duration-200",
    },
    // Role — establishes credibility, subtle emphasis
    role: {
      base: "text-xs uppercase tracking-overline text-foreground/75",
      emphasis: "font-medium text-foreground/85",
    },
    // Status — semantic but restrained (no loud colors)
    status: {
      base: "text-xs uppercase tracking-overline text-subtle",
      active: "text-foreground/70", // proposal, ongoing
      complete: "text-foreground/70", // finished, published
      concept: "text-foreground/75", // prototype, framework
    },
    // Strategic tags — limit to 2-3 high priority
    tag: {
      base: "text-[11px] uppercase tracking-overline border border-hairline px-2.5 py-1 text-subtle rounded",
      hover: "transition-colors duration-200 hover:text-foreground hover:border-hairline",
      accent: "border-terracotta text-terracotta/80", // optional: for featured/primary tags
    },
    // Pillar/capability tag
    pillar: {
      base: "text-[11px] uppercase tracking-overline border border-hairline px-2.5 py-1 text-subtle rounded",
    },
    // Label (university project, concept project, etc.)
    label: {
      base: "text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle rounded",
    },
  },

  // Metadata row structure (for "Project facts" sections)
  metadataRow: {
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-sm",
    item: "flex flex-col",
    label: "overline mb-2 text-subtle",
    value: "text-foreground/85",
    emphasis: "font-serif text-base", // for status/year
  },

  // Inline metadata (e.g., "Role — Account Manager")
  inlineMeta: {
    label: "text-foreground/55 font-normal",
    separator: "text-foreground/55",
    value: "text-foreground/80",
  },

  // Proof strip items
  proofStrip: {
    label: "overline mb-3 text-foreground/65",
    value: "font-serif leading-none text-foreground",
    valueNumeric: "text-3xl md:text-4xl tracking-[-0.01em]",
    valueConcept: "text-xl md:text-2xl tracking-tight",
    descriptor: "text-[11px] uppercase tracking-overline text-foreground/60 mt-2",
    detail: "text-sm text-subtle mt-3 leading-relaxed max-w-[24ch]",
  },

  // Editorial context colors (warm accent, restrained)
  colors: {
    neutral: "text-subtle",
    emphasis: "text-foreground",
    accent: "text-terracotta",
    softAccent: "text-terracotta/60",
    border: "border-hairline",
  },

  // Typography hierarchy
  typography: {
    overline: "text-xs uppercase tracking-overline",
    label: "text-xs uppercase tracking-overline font-normal",
    caption: "text-[11px] uppercase tracking-overline",
    meta: "text-xs text-subtle",
  },
};

/**
 * Metadata priority levels for consistent display
 * Higher priority items get more visual weight
 */
export const metadataPriority = {
  HIGH: {
    // Project type, role (recruiter-first signals)
    className: "font-medium text-foreground/85",
  },
  MEDIUM: {
    // Status, year, secondary pillars
    className: "text-foreground/75",
  },
  LOW: {
    // Tags (supporting), details
    className: "text-subtle",
  },
};

/**
 * Semantic status indicators (subtle, not loud)
 * Color differentiation only when necessary
 */
export const statusVariants = {
  active: {
    // Live, ongoing work
    label: "Active",
    className: "text-foreground/70",
  },
  complete: {
    // Finished, published, submitted
    label: "Complete",
    className: "text-foreground/70",
  },
  concept: {
    // Prototype, framework, proposal
    label: "Concept",
    className: "text-foreground/65",
  },
  draft: {
    // Early stage
    label: "Draft",
    className: "text-foreground/60",
  },
};

/**
 * Tag filtering — recruit-friendly categorization
 * Only show 2-3 high-priority tags visually; rest in details
 */
export const tagPriority = {
  maxVisibleTags: 3,
  maxVisiblePillars: 2,
  hideInCardsAbove: 2, // Hide lower-priority tags on card views
};
