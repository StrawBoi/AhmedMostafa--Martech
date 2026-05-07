import { journeyChapters } from "@/lib/data";

export default function Journey() {
  return (
    <section
      data-testid="selected-journey"
      className="py-24 md:py-32"
    >
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4 reveal">
          <p className="overline mb-4">Selected journey</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05]">
            From systems thinking to marketing thinking.
          </h2>
          <p className="mt-6 text-foreground/70 max-w-md leading-relaxed">
            Three chapters — short, honest, and the reason recruiters say I
            don't read like a typical marketing candidate.
          </p>
        </div>

        <div className="lg:col-span-8">
          <ol className="space-y-10 md:space-y-14">
            {journeyChapters.map((chapter, i) => (
              <li
                key={chapter.title}
                data-testid={`journey-chapter-${i}`}
                className="grid grid-cols-12 gap-6 reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="col-span-12 md:col-span-3">
                  <p className="overline text-terracotta">{chapter.period}</p>
                  <p className="font-mono text-xs text-subtle mt-2">
                    {String(i + 1).padStart(2, "0")} / {String(journeyChapters.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 border-l-0 md:border-l border-hairline md:pl-8">
                  <h3 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-foreground/75 leading-relaxed max-w-2xl">
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
