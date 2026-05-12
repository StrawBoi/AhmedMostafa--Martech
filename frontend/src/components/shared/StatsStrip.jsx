import React from "react";
import PropTypes from "prop-types";

export default function StatsStrip({ items = [], title = "Project signals", intro, tone = "light" }) {
  if (!items || !items.length) return null;

  if (tone === "dark") {
    return (
      <section className="container-editorial section-vertical">
        <div className="reveal">
          <p className="overline !text-[#cdb47b] mb-3">{title}</p>
          {intro && <p className="max-w-2xl text-base leading-relaxed text-[#d8d8d1] mb-4">{intro}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 reveal">
          {items.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-white/10 bg-[#141414] p-5 shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_14px_38px_rgba(0,0,0,0.25)]"
            >
              <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#6f5221] via-[#f0be68] to-[#6f5221] shadow-[0_0_14px_rgba(240,190,104,0.22)]" />
              <p className="mt-4 text-2xl md:text-3xl font-serif tracking-tight text-[#f5f5f2]">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#cdb47b]">{item.label}</p>
              {item.note && <p className="mt-3 text-sm leading-relaxed text-[#d8d8d1]">{item.note}</p>}
            </article>
          ))}
        </div>
      </section>
    );
  }

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

StatsStrip.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string.isRequired,
      note: PropTypes.string,
    }),
  ),
  tone: PropTypes.oneOf(["light", "dark"]),
};
