import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DeliverablesGrid from "@/components/sections/DeliverablesGrid";
import GallerySection from "@/components/sections/GallerySection";

function getProjectValue(project, key) {
  const value = project?.[key];
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

export function buildSignalItems(project) {
  return [
    { value: project?.type, label: "project type", note: project?.status },
    { value: project?.role, label: "role", note: project?.year },
    { value: project?.primaryPillar, label: "primary pillar", note: project?.secondaryPillar },
    { value: project?.tags?.slice(0, 3).join(", "), label: "focus areas", note: project?.tools?.slice(0, 3).join(", ") },
  ].filter((item) => item.value);
}

export function buildPositioningRows(project, keys = []) {
  const fallbackKeys = ["problem", "goal", "contribution", "researchAndStrategy", "strategy", "goToMarket", "outcomes"];
  const sourceKeys = keys.length ? keys : fallbackKeys;

  return sourceKeys
    .map((key) => ({
      category: key
        .replace(/And/g, " and ")
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase()),
      value: getProjectValue(project, key),
    }))
    .filter((row) => row.value);
}

export function CaseStudyStatsStrip({ items = [], title = "Project signals", intro }) {
  if (!items.length) return null;

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal">
        <p className="overline mb-3">{title}</p>
        {intro && <p className="max-w-2xl text-base leading-relaxed text-foreground/70 mb-4">{intro}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 reveal">
        {items.slice(0, 4).map((item) => (
          <article key={`${item.label}-${item.value}`} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
            <div className="h-1.5 w-12 rounded-full bg-terracotta/80" />
            <p className="mt-4 font-serif text-2xl md:text-3xl tracking-tight text-foreground">{item.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-subtle">{item.label}</p>
            {item.note && <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

export function CaseStudyPositioningTable({ rows = [], title = "Positioning table", intro }) {
  if (!rows.length) return null;

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal mb-4">
        <p className="overline mb-3">{title}</p>
        {intro && <p className="max-w-3xl text-base leading-relaxed text-foreground/70">{intro}</p>}
      </div>

      <div className="reveal overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm">
        <div className="grid grid-cols-12 border-b border-hairline bg-background/60 text-xs uppercase tracking-[0.18em] text-subtle">
          <div className="col-span-12 md:col-span-3 px-4 py-3">Area</div>
          <div className="col-span-12 md:col-span-9 px-4 py-3 border-t md:border-t-0 md:border-l border-hairline">Strategic read</div>
        </div>

        <div className="divide-y divide-hairline">
          {rows.map((row) => (
            <div key={row.category} className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-3 px-4 py-4 bg-background/45">
                <p className="text-xs uppercase tracking-[0.16em] text-subtle">{row.category}</p>
              </div>
              <div className="col-span-12 md:col-span-9 px-4 py-4 border-t md:border-t-0 md:border-l border-hairline text-base leading-relaxed text-foreground/85">
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyDeliverablesGrid({ items = [], title = "Deliverables", intro }) {
  return <DeliverablesGrid items={items} title={title} intro={intro} />;
}

export function CaseStudyGallery({ items = [], title = "Gallery", intro }) {
  return <GallerySection items={items} title={title} intro={intro} />;
}

export function CaseStudyClosingNote({ title, body, ctaLabel = "Open the contact form", ctaTo = "/contact" }) {
  if (!title && !body) return null;

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal border border-hairline bg-surface p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
        <div>
          <p className="overline">Closing note</p>
          {title && (
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mt-3 text-foreground max-w-2xl">
              {title}
            </h2>
          )}
          {body && <p className="mt-4 text-base text-foreground/75 max-w-2xl leading-relaxed">{body}</p>}
        </div>
        <Link to={ctaTo} className="inline-flex items-center gap-2 border border-terracotta/60 text-terracotta hover:bg-terracotta hover:text-white transition-colors px-5 py-3 text-sm font-medium">
          {ctaLabel} <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

CaseStudyStatsStrip.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string.isRequired,
      note: PropTypes.string,
    }),
  ),
};

CaseStudyPositioningTable.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};

CaseStudyDeliverablesGrid.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
};

CaseStudyGallery.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
      category: PropTypes.string,
    }),
  ),
};

CaseStudyClosingNote.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaTo: PropTypes.string,
};
