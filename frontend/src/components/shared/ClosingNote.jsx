import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ClosingNote({ title, body, ctaLabel = "Open the contact form", ctaTo = "/contact", tone = "light" }) {
  if (!title && !body) return null;

  const containerClass =
    tone === "dark"
      ? "reveal border border-white/10 bg-[#131313] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_18px_50px_rgba(0,0,0,0.3)]"
      : "reveal border border-hairline bg-surface p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm";

  return (
    <section className="container-editorial section-vertical">
      <div className={containerClass}>
        <div>
          <p className="overline">Closing note</p>
          {title && <h2 className="font-serif text-3xl md:text-4xl leading-tight mt-3 text-foreground max-w-2xl">{title}</h2>}
          {body && <p className="mt-4 text-base text-foreground/75 max-w-2xl leading-relaxed">{body}</p>}
        </div>
        <Link
          to={ctaTo}
          className={
            tone === "dark"
              ? "inline-flex items-center gap-2 border border-[#f0be68]/60 text-[#f0be68] hover:bg-[#f0be68] hover:text-[#171717] transition-colors px-5 py-3 text-sm font-medium shadow-[0_0_0_1px_rgba(240,190,104,0.06)]"
              : "inline-flex items-center gap-2 border border-terracotta/60 text-terracotta hover:bg-terracotta hover:text-white transition-colors px-5 py-3 text-sm font-medium"
          }
        >
          {ctaLabel} <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}

ClosingNote.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaTo: PropTypes.string,
  tone: PropTypes.oneOf(["light", "dark"]),
};
