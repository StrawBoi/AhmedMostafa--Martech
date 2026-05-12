import React from "react";
import PropTypes from "prop-types";

export default function FactsGrid({ facts = [], tone = "light" }) {
  if (!facts.length) return null;

  if (tone === "dark") {
    return (
      <section className="container-editorial section-vertical">
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_16px_40px_rgba(0,0,0,0.28)]">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-[#151515] px-4 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#cdb47b]">{fact.label}</p>
              <p className="mt-2 text-sm leading-snug text-[#f5f5f2]">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px border border-hairline bg-surface shadow-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-background/45 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-subtle">{fact.label}</p>
            <p className="mt-2 text-sm leading-snug text-foreground/85">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

FactsGrid.propTypes = {
  tone: PropTypes.oneOf(["light", "dark"]),
  facts: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};
