import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";

function ProjectImage({ src, alt, ratio = "aspect-[4/3]" }) {
  return (
    <div
      className={`${ratio} w-full overflow-hidden bg-surface relative`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

function FeaturedCard({ project, dominant = false }) {
  const Body = (
    <div
      data-testid={`featured-project-${project.slug}`}
      className={`group block ${dominant ? "" : ""}`}
    >
      <ProjectImage
        src={project.image}
        alt={project.title}
        ratio={dominant ? "aspect-[16/10]" : "aspect-[4/5]"}
      />

      <div className={`mt-6 ${dominant ? "max-w-3xl" : ""}`}>
        <div className="flex items-center justify-between gap-4">
          <p className="overline">{project.eyebrow}</p>
          <span className="overline text-subtle">Case study</span>
        </div>
        <h3
          className={`font-serif font-light tracking-tight mt-3 leading-[1.1] ${
            dominant
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-2xl md:text-3xl"
          }`}
        >
          {project.title}
        </h3>

        <div className={`mt-4 grid gap-3 ${dominant ? "md:grid-cols-2 md:gap-8" : ""}`}>
          <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
            <span className="text-foreground/55">Challenge — </span>
            {project.challenge}
          </p>
          <p className="text-sm md:text-base text-foreground/75 leading-relaxed">
            <span className="text-foreground/55">Role — </span>
            {project.role}
          </p>
        </div>

        <p className="mt-4 text-sm md:text-base font-medium text-terracotta">
          {project.takeaway}
        </p>

        <div className="mt-6 flex items-center justify-between">
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
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-terracotta transition-colors">
            Read case study <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="reveal"
    >
      {Body}
    </Link>
  );
}

export default function FeaturedWork() {
  const [first, ...rest] = featuredProjects;

  return (
    <section
      data-testid="featured-work"
      className="py-24 md:py-32"
    >
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-6 mb-14 md:mb-20 reveal">
          <div>
            <p className="overline mb-4">Selected work</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-2xl leading-[1.05]">
              Three pieces that show how I think.
            </h2>
          </div>
          <Link
            to="/projects"
            data-testid="see-all-projects-link"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium link-underline"
          >
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Asymmetric layout: dominant first card, two stacked secondary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16">
          <div className="lg:col-span-12">
            <FeaturedCard project={first} dominant />
          </div>

          {rest.map((p, idx) => (
            <div
              key={p.slug}
              className={`lg:col-span-6 ${idx === 0 ? "lg:pt-8" : "lg:pt-24"}`}
            >
              <FeaturedCard project={p} />
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium link-underline"
          >
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
