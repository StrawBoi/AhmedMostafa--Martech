import PropTypes from "prop-types";

const defaultItems = [
  {
    label: "Category",
    value: "Product strategy concept",
  },
  {
    label: "Audience",
    value: "Belgian horeca operators evaluating software on business impact, not feature count.",
  },
  {
    label: "Value proposition",
    value: "Turn POS data into clear, ROI-linked decisions on margin, demand, and profitability.",
  },
  {
    label: "Differentiators",
    value: "AI-first insight, stronger positioning, and a premium intelligence-layer story that is harder to copy.",
  },
  {
    label: "Why it matters",
    value: "It aligns the concept with ROI-based buying behavior and makes the offer easier to defend and price.",
  },
];

export default function MosolPositioningSummary({ items = defaultItems }) {
  return (
    <section className="container-editorial pb-12">
      <div className="reveal max-w-[420px] lg:ml-auto">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 md:p-6 shadow-[0_0_0_1px_rgba(240,190,104,0.04),0_18px_44px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between gap-4">
            <p className="overline !text-[#cdb47b]">Positioning summary</p>
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f0be68] shadow-[0_0_0_4px_rgba(240,190,104,0.12),0_0_16px_rgba(240,190,104,0.28)]" />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[#d8d8d1]">
            A compact read on who the concept serves, what it promises, and why the positioning feels more credible than a basic tool narrative.
          </p>

          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.label} className="border-t border-white/10 pt-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#cdb47b]">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#f5f5f2]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

MosolPositioningSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};