import { proofPoints } from "@/lib/data";

export default function ProofStrip() {
  return (
    <section
      data-testid="proof-strip"
      className="border-y border-hairline bg-surface/50"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x lg:divide-y-0 lg:divide-x divide-hairline">
          {proofPoints.map((p, i) => (
            <div
              key={p.label}
              data-testid={`proof-item-${i}`}
              className="reveal py-8 md:py-12 px-0 sm:px-7 first:sm:pl-0 last:sm:pr-0"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="overline mb-3 text-foreground/65">{p.label}</p>
              <p className="font-serif text-lg md:text-xl leading-snug text-foreground">
                {p.value}
              </p>
              <p className="text-sm text-subtle mt-2 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
