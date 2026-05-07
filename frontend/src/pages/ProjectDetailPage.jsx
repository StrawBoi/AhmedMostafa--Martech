import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import useReveal from "@/hooks/useReveal";
import { allProjects } from "@/lib/data";

export default function ProjectDetailPage() {
  useReveal();
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="container-editorial py-32 text-center" data-testid="project-not-found">
        <p className="overline mb-4">404</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          That case study isn't published yet.
        </h1>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-8 link-underline">
          <ArrowLeft size={14} /> Back to all projects
        </Link>
      </main>
    );
  }

  const idx = allProjects.findIndex((p) => p.slug === slug);
  const next = allProjects[(idx + 1) % allProjects.length];

  return (
    <main data-testid={`case-study-${project.slug}`} className="pt-10 md:pt-16">
      <section className="container-editorial pb-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-10 reveal"
        >
          <ArrowLeft size={14} /> All projects
        </Link>
        <p className="overline mb-5 reveal">{project.eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-5xl reveal">
          {project.title}
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 reveal" style={{ transitionDelay: "120ms" }}>
          <div>
            <p className="overline mb-2">Role</p>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
              {project.role}
            </p>
          </div>
          <div>
            <p className="overline mb-2">Status</p>
            <p className="text-sm md:text-base text-foreground/85">
              Case study draft — full write-up on request
            </p>
          </div>
          <div>
            <p className="overline mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-overline border border-hairline px-2.5 py-1 text-subtle">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="container-editorial">
          <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="overline mb-3 reveal">The takeaway</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug text-terracotta reveal">
            {project.takeaway}
          </p>
        </div>
        <div className="lg:col-span-8 space-y-10">
          <div className="reveal">
            <p className="overline mb-3">Challenge</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {project.challenge}
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <p className="overline mb-3">Approach</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              I'm finalizing the full write-up — methodology, decisions made,
              what worked, and what I'd do differently. Happy to walk a
              recruiter or hiring manager through the long version on a call.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: "200ms" }}>
            <p className="overline mb-3">Outcome</p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {project.takeaway} The detailed numbers, screenshots, and
              stakeholder takeaways live in the full case study — available on
              request via the contact form.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline">
        <div className="container-editorial py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={`/projects/${next.slug}`}
            data-testid="next-case-study"
            className="group block"
          >
            <p className="overline mb-3">Next case study</p>
            <p className="font-serif text-2xl md:text-3xl tracking-tight transition-colors group-hover:text-terracotta">
              {next.title}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium link-underline">
              Read next <ArrowUpRight size={14} />
            </span>
          </Link>
          <div className="md:text-right">
            <p className="overline mb-3">Want the full version?</p>
            <p className="font-serif text-2xl md:text-3xl tracking-tight">
              I'm happy to walk you through it.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium link-underline"
            >
              Open the contact form <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
