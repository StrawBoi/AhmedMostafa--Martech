import PropTypes from "prop-types";
import { metadataTokens, metadataPriority, statusVariants, tagPriority } from "@/lib/metadata-tokens";

/**
 * MetadataBadge
 *
 * Unified badge component for all metadata elements:
 * project type, role, status, tags, pillars, labels
 *
 * Props:
 *   - variant: 'type' | 'role' | 'status' | 'tag' | 'pillar' | 'label'
 *   - children: badge content/text
 *   - isAccent: (optional) apply accent color (for primary tags)
 *   - statusType: (optional) used with variant='status', one of: active, complete, concept, draft
 *   - className: (optional) additional Tailwind classes
 */
export function MetadataBadge({ 
  variant = "tag", 
  children, 
  isAccent = false,
  statusType = "complete",
  className = "",
}) {
  const badgeTokens = metadataTokens.badges;

  const variantStyles = {
    type: `${badgeTokens.projectType.base} ${badgeTokens.projectType.hover}`,
    role: `${badgeTokens.role.base} ${badgeTokens.role.emphasis}`,
    status: `${badgeTokens.status.base} ${badgeTokens.status[statusType] || badgeTokens.status.complete}`,
    tag: `${badgeTokens.tag.base} ${badgeTokens.tag.hover} ${isAccent ? badgeTokens.tag.accent : ""}`,
    pillar: `${badgeTokens.pillar.base}`,
    label: `${badgeTokens.label.base}`,
  };

  return (
    <span className={`inline-block ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

MetadataBadge.propTypes = {
  variant: PropTypes.oneOf(["type", "role", "status", "tag", "pillar", "label"]),
  children: PropTypes.node.isRequired,
  isAccent: PropTypes.bool,
  statusType: PropTypes.oneOf(["active", "complete", "concept", "draft"]),
  className: PropTypes.string,
};

/**
 * MetadataRow
 *
 * Structured grid display for project facts/metadata
 * Used in detail pages for status, year, role, pillars, etc.
 *
 * Props:
 *   - items: array of { label: string, value: string|node }
 *   - containerClassName: (optional) override grid container classes
 */
export function MetadataRow({ 
  items = [],
  containerClassName = "",
}) {
  const tokens = metadataTokens.metadataRow;
  const container = containerClassName || tokens.container;

  return (
    <div className={container}>
      {items.map((item, idx) => (
        <div key={idx} className={tokens.item}>
          <p className={tokens.label}>{item.label}</p>
          <p className={`${tokens.value} ${item.emphasis ? tokens.emphasis : ""}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

MetadataRow.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      emphasis: PropTypes.bool,
    })
  ),
  containerClassName: PropTypes.string,
};

/**
 * MetadataInline
 *
 * Inline metadata display (e.g., "Role — Account Manager")
 * Used in featured cards and summary sections
 *
 * Props:
 *   - label: metadata label (e.g., "Role", "Challenge")
 *   - value: metadata value
 *   - separator: (optional, default "—") separator character
 *   - className: (optional) wrapper classes
 */
export function MetadataInline({ 
  label, 
  value, 
  separator = "—",
  className = "",
}) {
  const tokens = metadataTokens.inlineMeta;

  return (
    <p className={`text-sm text-foreground/80 leading-relaxed ${className}`}>
      <span className={tokens.label}>{label} {separator}</span>
      {" "}
      <span className={tokens.value}>{value}</span>
    </p>
  );
}

MetadataInline.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  separator: PropTypes.string,
  className: PropTypes.string,
};

/**
 * TagGroup
 *
 * Display a group of tags with priority limiting
 * Typically shows top 2-3 tags on cards, full list in details
 *
 * Props:
 *   - tags: array of tag strings
 *   - variant: 'full' (show all) | 'card' (show top N)
 *   - accentIndex: (optional) index of tag to highlight with accent color
 *   - className: (optional) wrapper classes
 */
export function TagGroup({ 
  tags = [],
  variant = "card",
  accentIndex = -1,
  className = "",
}) {
  const displayLimit = variant === "card" ? tagPriority.maxVisibleTags : tags.length;
  const displayTags = tags.slice(0, displayLimit);

  if (!displayTags.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, idx) => (
        <MetadataBadge
          key={tag}
          variant="tag"
          isAccent={idx === accentIndex}
        >
          {tag}
        </MetadataBadge>
      ))}
    </div>
  );
}

TagGroup.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["full", "card"]),
  accentIndex: PropTypes.number,
  className: PropTypes.string,
};

/**
 * PillarBadges
 *
 * Display primary and secondary pillars with proper hierarchy
 *
 * Props:
 *   - primary: primary pillar string
 *   - secondary: (optional) secondary pillar string
 *   - variant: 'badges' | 'inline'
 *   - className: (optional) wrapper classes
 */
export function PillarBadges({
  primary,
  secondary,
  variant = "badges",
  className = "",
}) {
  if (!primary) return null;

  if (variant === "inline") {
    return (
      <div className={`text-xs text-subtle ${className}`}>
        <span className="font-medium">{primary}</span>
        {secondary && <span> • {secondary}</span>}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <MetadataBadge variant="pillar">{primary}</MetadataBadge>
      {secondary && <MetadataBadge variant="pillar">{secondary}</MetadataBadge>}
    </div>
  );
}

PillarBadges.propTypes = {
  primary: PropTypes.string,
  secondary: PropTypes.string,
  variant: PropTypes.oneOf(["badges", "inline"]),
  className: PropTypes.string,
};
