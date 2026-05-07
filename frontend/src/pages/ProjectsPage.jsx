import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { allProjects } from "@/lib/data";

export default function ProjectsPage() {
  useReveal();
  return (
    <main data-testid="projects-page" className="pt-12 md:pt-20">
      <section className="container-editorial pb-16 md:pb-24">
        <p className="overline mb-5 reveal">All projects</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] reveal">
          Work that mixes <span className="italic text-terracotta">research</span>,
          <br />
          campaigns, and execution.
        </h1>
        <p
          className="mt-8 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed reveal"
          style={{ transitionDelay: "120ms" }}
        >
          A growing collection of case studies. Each one is short, structured,
          and written for someone trying to evaluate a candidate — not for
          design awards.
        </p>
      </section>

      <section className="container-editorial pb-32">
        <ul className="border-t border-hairline">
          {allProjects.map((p, i) => (
            <li
              key={p.slug}
              data-testid={`project-row-${p.slug}`}
              className="border-b border-hairline reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Link
                to={`/projects/${p.slug}`}
                className="grid grid-cols-12 gap-4 md:gap-8 items-center py-7 md:py-10 group"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-5">
                  <p className="overline mb-2">{p.eyebrow}</p>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight transition-colors group-hover:text-terracotta">
                    {p.title}
                  </h2>
                </div>
                <p className="hidden md:block md:col-span-4 text-sm text-foreground/70 leading-relaxed">
                  {p.takeaway}
                </p>
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
