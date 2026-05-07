import { proofPoints } from "@/lib/data";

export default function ProofStrip() {
  return (
    <section
      data-testid="proof-strip"
      className="border-y border-hairline bg-surface/60"
    >
      <div className="container-editorial grid grid-cols-2 md:grid-cols-4">
        {proofPoints.map((p, i) => (
          <div
            key={p.label}
            data-testid={`proof-item-${i}`}
            className={`reveal py-8 md:py-10 px-2 md:px-6 ${
              i !== 0 ? "md:border-l border-hairline" : ""
            } ${i === 1 ? "border-l border-hairline md:border-l" : ""} ${
              i >= 2 ? "border-t md:border-t-0 border-hairline" : ""
            }`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <p className="overline mb-3">{p.label}</p>
            <p className="font-serif text-lg md:text-xl leading-snug">
              {p.value}
            </p>
            <p className="text-xs md:text-sm text-subtle mt-2">{p.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
