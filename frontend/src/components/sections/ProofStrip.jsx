import { proofPoints } from "@/lib/data";

export default function ProofStrip() {
  return (
    <section
      data-testid="proof-strip"
      className="border-y border-hairline bg-surface/50"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x lg:divide-y-0 lg:divide-x divide-hairline">
          {proofPoints.map((p, i) => {
            const isConcept = p.kind === "concept" || !/\d/.test(String(p.value));
            return (
            <div
              key={p.label}
              data-testid={`proof-item-${i}`}
              className="reveal py-8 md:py-12 px-0 sm:px-7 first:sm:pl-0 last:sm:pr-0 min-h-[164px] md:min-h-[180px] flex flex-col"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="overline mb-3 text-foreground/65">{p.label}</p>
              <p
                className={`font-serif leading-none text-foreground ${
                  isConcept
                    ? "text-xl md:text-2xl tracking-tight"
                    : "text-3xl md:text-4xl tracking-[-0.01em]"
                }`}
              >
                {p.value}
              </p>
              {isConcept && p.descriptor ? (
                <p className="text-[11px] uppercase tracking-overline text-foreground/60 mt-2">
                  {p.descriptor}
                </p>
              ) : null}
              <p className="text-sm text-subtle mt-3 leading-relaxed max-w-[24ch]">{p.detail}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
