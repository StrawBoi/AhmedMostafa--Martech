import PropTypes from "prop-types";

function normalizeItem(item) {
  if (typeof item === "string") {
    return { title: item, description: "", Icon: null };
  }

  return {
    title: item.title || item.label || "",
    description: item.description || item.note || "",
    Icon: item.Icon || null,
  };
}

const tones = {
  light: {
    sectionIntro: "text-base leading-relaxed text-foreground/70",
    card: "group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-5 shadow-sm",
    accent: "absolute inset-x-0 top-0 h-1 bg-terracotta/80",
    badge: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline bg-background text-sm font-medium text-terracotta",
    title: "font-serif text-xl leading-tight text-foreground",
    description: "mt-2 text-base leading-relaxed text-foreground/70 line-clamp-2",
  },
  dark: {
    sectionIntro: "text-base leading-relaxed text-[#d8d8d1]",
    card: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-5 transition-transform duration-300 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_14px_36px_rgba(0,0,0,0.22)]",
    accent: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#72541f] via-[#f0be68] to-[#72541f] shadow-[0_0_18px_rgba(240,190,104,0.24)]",
    badge: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f0be68]/18 bg-[#f0be68]/8 text-[#f0be68] shadow-[0_0_14px_rgba(240,190,104,0.12)]",
    title: "font-serif text-xl leading-tight text-[#f5f5f2]",
    description: "mt-2 text-base leading-relaxed text-[#d8d8d1] line-clamp-2",
  },
};

export default function DeliverablesGrid({
  items = [],
  title = "Deliverables",
  intro,
  tone = "light",
  sectionClassName = "container-editorial section-vertical",
  introWrapperClassName = "reveal mb-4 max-w-3xl",
}) {
  if (!items.length) return null;

  const theme = tones[tone] || tones.light;

  return (
    <section className={sectionClassName}>
      <div className={introWrapperClassName}>
        <p className="overline mb-3">{title}</p>
        {intro && <p className={theme.sectionIntro}>{intro}</p>}
      </div>

      <div className="reveal grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((rawItem, index) => {
          const item = normalizeItem(rawItem);
          const Badge = item.Icon;

          return (
            <article key={item.title || index} className={theme.card}>
              <div className={theme.accent} />

              <div className="flex items-start gap-4">
                <div className={theme.badge}>
                  {Badge ? <Badge size={18} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
                </div>

                <div className="min-w-0">
                  <h3 className={theme.title}>{item.title}</h3>
                  {item.description ? <p className={theme.description}>{item.description}</p> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

DeliverablesGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string,
        label: PropTypes.string,
        description: PropTypes.string,
        note: PropTypes.string,
        Icon: PropTypes.elementType,
      }),
    ])
  ),
  title: PropTypes.string,
  intro: PropTypes.string,
  tone: PropTypes.oneOf(["light", "dark"]),
  sectionClassName: PropTypes.string,
  introWrapperClassName: PropTypes.string,
};
