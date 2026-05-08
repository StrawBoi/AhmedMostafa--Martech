import { journeyChapters } from "@/lib/data";

export default function Journey() {
  return (
    <section
      data-testid="selected-journey"
      className="py-24 md:py-36"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">Selected journey</p>
          <h2 className="h-section">From systems thinking to marketing thinking.</h2>
          <p className="mt-6 text-foreground/75 max-w-md leading-relaxed">
            Three short chapters that explain internship fit fast: how I connect
            operational rigor, research, and marketing execution.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-12 md:space-y-16">
            {journeyChapters.map((chapter, i) => (
              <li
                key={chapter.title}
                data-testid={`journey-chapter-${i}`}
                className="grid grid-cols-12 gap-5 md:gap-6 reveal"
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="overline text-terracotta">{chapter.period}</p>
                  <p className="font-mono text-[11px] tracking-widest text-subtle mt-2">
                    {String(i + 1).padStart(2, "0")} / {String(journeyChapters.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 md:border-l border-hairline md:pl-8">
                  <h3 className="font-serif text-2xl md:text-[1.85rem] tracking-tight leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-foreground/80 leading-relaxed max-w-2xl">
                    {chapter.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
