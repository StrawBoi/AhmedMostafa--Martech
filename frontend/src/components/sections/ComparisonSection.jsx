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
        <p className="overline !text-[#cdb47b] mb-3">{title}</p>
        <p className="max-w-3xl text-base leading-relaxed text-[#d8d8d1]">{intro}</p>
      </div>

      <div className="reveal space-y-4 md:hidden">
        {rows.map((row) => (
          <article key={row.category} className="overflow-hidden rounded-2xl border border-white/10 bg-[#131313] shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_20px_50px_rgba(0,0,0,0.28)]">
            <div className="border-b border-white/10 bg-[#161616] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-[#cdb47b]">{row.category}</p>
            </div>

            <div className="space-y-px bg-white/10">
              <div className="bg-[#141414] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#cdb47b]">{leftColumnLabel}</p>
                <p className="mt-2 text-base leading-relaxed text-[#d8d8d1]">{row.left}</p>
              </div>

              <div className="bg-[linear-gradient(180deg,#1c1c1c_0%,#141414_100%)] px-4 py-4">
                <span className="inline-flex items-center rounded-full border border-[#f0be68]/20 bg-[#f0be68]/8 px-2 py-0.5 text-xs uppercase tracking-[0.16em] text-[#f0be68] shadow-[0_0_12px_rgba(240,190,104,0.12)]">
                  {strongerFitLabel}
                </span>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#cdb47b]">{rightColumnLabel}</p>
                <p className="mt-2 text-base leading-relaxed text-[#f5f5f2]">{row.right}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal hidden overflow-hidden rounded-2xl border border-white/10 bg-[#131313] shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_20px_50px_rgba(0,0,0,0.28)] md:block">
        <div className="grid grid-cols-12 border-b border-white/10 bg-[#161616] text-xs uppercase tracking-[0.18em] text-[#cdb47b]">
          <div className="col-span-12 md:col-span-3 px-4 py-3">Category</div>
          <div className="col-span-12 md:col-span-4 px-4 py-3 border-t md:border-t-0 md:border-l border-white/10">{leftColumnLabel}</div>
          <div className="col-span-12 md:col-span-5 px-4 py-3 border-t md:border-t-0 md:border-l border-white/10 text-[#f5f5f2]">{rightColumnLabel}</div>
        </div>

        <div className="divide-y divide-white/10">
          {rows.map((row) => (
            <div key={row.category} className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-3 px-4 py-4 bg-[#151515]">
                <p className="text-xs uppercase tracking-[0.16em] text-[#cdb47b]">{row.category}</p>
              </div>

              <div className="col-span-12 md:col-span-4 px-4 py-4 border-t md:border-t-0 md:border-l border-white/10 bg-[#141414] text-base leading-relaxed text-[#d8d8d1]">
                {row.left}
              </div>

              <div className="col-span-12 md:col-span-5 px-4 py-4 border-t md:border-t-0 md:border-l border-white/10 bg-[linear-gradient(180deg,#1c1c1c_0%,#141414_100%)] text-base leading-relaxed text-[#f5f5f2]">
                <span className="inline-flex items-center rounded-full border border-[#f0be68]/20 bg-[#f0be68]/8 px-2 py-0.5 text-xs uppercase tracking-[0.16em] text-[#f0be68] mb-2 shadow-[0_0_12px_rgba(240,190,104,0.12)]">
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
