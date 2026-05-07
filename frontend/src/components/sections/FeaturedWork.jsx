import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { track, Events } from "@/lib/analytics";

function ProjectImage({ src, alt, ratio = "aspect-[4/3]" }) {
  return (
    <div className={`${ratio} w-full bg-surface img-zoom relative`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function FeaturedCard({ project, dominant = false, delay = 0 }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      onClick={() =>
        track(Events.PROJECT_CARD_CLICKED, {
          slug: project.slug,
          source: "home_featured",
          dominant,
        })
      }
      data-testid={`featured-project-${project.slug}`}
      className="group block reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ProjectImage
        src={project.image}
        alt={project.title}
        ratio={dominant ? "aspect-[16/10]" : "aspect-[4/5]"}
      />

      <div className={`mt-7 md:mt-8 ${dominant ? "max-w-3xl" : ""}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="overline">{project.eyebrow}</p>
          <span className="overline text-subtle">Case study</span>
        </div>
        <h3
          className={`font-serif font-light tracking-tight mt-3 leading-[1.08] transition-colors duration-300 group-hover:text-terracotta ${
            dominant
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl"
          }`}
        >
          {project.title}
        </h3>

        <div className={`mt-5 grid gap-3 ${dominant ? "md:grid-cols-2 md:gap-8" : ""}`}>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            <span className="text-foreground/55">Challenge — </span>
            {project.challenge}
          </p>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            <span className="text-foreground/55">Role — </span>
            {project.role}
          </p>
        </div>

        <p className="mt-5 text-sm md:text-base font-medium text-terracotta leading-snug">
          {project.takeaway}
        </p>

        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-overline border border-hairline px-2.5 py-1 text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-terracotta whitespace-nowrap">
            Read case study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  const [first, ...rest] = featuredProjects;

  return (
    <section data-testid="featured-work" className="py-24 md:py-36">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-6 mb-16 md:mb-24 reveal">
          <div>
            <p className="overline mb-4">Selected work</p>
            <h2 className="h-section max-w-2xl">
              Three pieces that show how I think.
            </h2>
          </div>
          <Link
            to="/projects"
            data-testid="see-all-projects-link"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium link-underline shrink-0 mb-2"
          >
            All projects
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Asymmetric layout: dominant first card, two stacked secondary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20">
          <div className="lg:col-span-12">
            <FeaturedCard project={first} dominant delay={0} />
          </div>

          {rest.map((p, idx) => (
            <div
              key={p.slug}
              className={`lg:col-span-6 ${idx === 0 ? "lg:pt-10" : "lg:pt-28"}`}
            >
              <FeaturedCard project={p} delay={(idx + 1) * 140} />
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 reveal">
          <div className="border-t border-hairline pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="font-serif text-xl md:text-2xl tracking-tight max-w-xl leading-snug">
              Want the full set of case studies?
            </p>
            <Link
              to="/projects"
              data-testid="featured-cta-all-projects"
              className="btn-primary group self-start md:self-auto"
            >
              Browse all projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
