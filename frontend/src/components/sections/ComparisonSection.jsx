import PropTypes from "prop-types";

export default function ComparisonSection({
  title = "Strategy shift",
  intro = "The positioning moved from a basic reporting tool to a clearer decision-support story that feels more relevant to ROI-led buyers.",
  leftColumnLabel = "Simple Inventory Management",
  rightColumnLabel = "The Intelligence Hub",
  rows = [],
  strongerFitLabel = "stronger fit",
}) {
  if (!rows.length) return null;

  return (
    <section className="container-editorial section-vertical">
      <div className="reveal mb-4">
        <p className="overline mb-3">{title}</p>
        <p className="max-w-3xl text-base leading-relaxed text-foreground/80">{intro}</p>
      </div>

      <div className="reveal space-y-4 md:hidden">
        {rows.map((row) => (
          <article key={row.category} className="overflow-hidden rounded-2xl border border-hairline bg-background/50">
            <div className="border-b border-hairline bg-background px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-foreground/60">{row.category}</p>
            </div>

            <div className="space-y-px">
              <div className="bg-background px-4 py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/60">{leftColumnLabel}</p>
                <p className="mt-2 text-base leading-relaxed text-foreground/85">{row.left}</p>
              </div>

              <div className="bg-background/75 px-4 py-4">
                <span className="inline-flex items-center rounded-full border border-terracotta/30 bg-terracotta/10 px-2 py-0.5 text-xs uppercase tracking-[0.16em] text-terracotta">
                  {strongerFitLabel}
                </span>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-foreground/60">{rightColumnLabel}</p>
                <p className="mt-2 text-base leading-relaxed text-foreground">{row.right}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal hidden overflow-hidden rounded-2xl border border-hairline bg-background/50 md:block">
        <div className="grid grid-cols-12 border-b border-hairline bg-background text-xs uppercase tracking-[0.18em] text-foreground/60">
          <div className="col-span-12 md:col-span-3 px-4 py-3">Category</div>
          <div className="col-span-12 md:col-span-4 px-4 py-3 border-t md:border-t-0 md:border-l border-hairline">{leftColumnLabel}</div>
          <div className="col-span-12 md:col-span-5 px-4 py-3 border-t md:border-t-0 md:border-l border-hairline text-foreground">{rightColumnLabel}</div>
        </div>

        <div className="divide-y divide-hairline">
          {rows.map((row) => (
            <div key={row.category} className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-3 px-4 py-4 bg-background">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/60">{row.category}</p>
              </div>

              <div className="col-span-12 md:col-span-4 px-4 py-4 border-t md:border-t-0 md:border-l border-hairline bg-background/75 text-base leading-relaxed text-foreground/85">
                {row.left}
              </div>

              <div className="col-span-12 md:col-span-5 px-4 py-4 border-t md:border-t-0 md:border-l border-hairline bg-background text-base leading-relaxed text-foreground">
                <span className="inline-flex items-center rounded-full border border-terracotta/30 bg-terracotta/10 px-2 py-0.5 text-xs uppercase tracking-[0.16em] text-terracotta mb-2">
                  {strongerFitLabel}
                </span>
                <div>{row.right}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

ComparisonSection.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  leftColumnLabel: PropTypes.string,
  rightColumnLabel: PropTypes.string,
  strongerFitLabel: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      right: PropTypes.string.isRequired,
    })
  ),
};
