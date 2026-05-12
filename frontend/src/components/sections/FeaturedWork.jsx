import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { track, Events } from "@/lib/analytics";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import { TagGroup } from "@/components/ui/MetadataBadge";

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
          <TagGroup tags={project.tags} variant="card" />
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
  // recruiter-first order: show Volvo then CINEMATEK, then existing featured projects
  const volvo = featuredProjects.find((p) => p.id === "volvo-belgium-campaign") ||
    null;
  const cinematek = featuredProjects.find((p) => p.id === "cinematek-decades-of-cinema") ||
    null;

  // If they're not marked as featured, find them in full project list
  // fallback: import from data at runtime (avoid circular imports here)
  let recruiterFirst = [];
  try {
    // prefer explicit order
    const all = featuredProjects;
    // include by id from the global projects if not present in featuredProjects
    recruiterFirst = [
      ...([])
    ];
  } catch (e) {
    recruiterFirst = [...featuredProjects];
  }

  // Build an ordered list: explicit Volvo, CINEMATEK, then other featured projects
  const ordered = [];
  const addIfExists = (id) => {
    const p = featuredProjects.find((x) => x.id === id) || null;
    if (p && !ordered.find((o) => o.id === p.id)) ordered.push(p);
  };
  addIfExists("volvo-belgium-campaign");
  addIfExists("cinematek-decades-of-cinema");
  featuredProjects.forEach((p) => {
    if (!ordered.find((o) => o.id === p.id)) ordered.push(p);
  });

  // Filters: Strategizing and Communication
  const [filters, setFilters] = useState([]);
  const toggleFilter = (f) =>
    setFilters((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  const visible = ordered.filter((p) => {
    if (filters.length === 0) return true;
    return (
      filters.includes(p.primaryPillar) || (p.secondaryPillar && filters.includes(p.secondaryPillar))
    );
  });

  return (
    <section data-testid="featured-work" className="py-24 md:py-36">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-6 mb-6 md:mb-12 reveal">
          <div>
            <p className="overline mb-4">SELECTED WORK</p>
            <h2 className="h-section max-w-2xl">A few projects that show how I think.</h2>
            <p className="mt-3 text-sm text-foreground/75">These projects reflect the kind of work I enjoy most: understanding a problem, shaping a clear direction, and turning it into something concrete.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <FeaturedProjectCard projectId="volvo-belgium-campaign" dominant />
          </div>
          <div className="md:col-span-1">
            <FeaturedProjectCard projectId="cinematek-decades-of-cinema" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <FeaturedProjectCard projectId="mosol-horease-profit-intelligence" />
          </div>
          <div className="md:col-span-1">
            <FeaturedProjectCard projectId="marketing-intelligence-analysis" />
          </div>
        </div>

        <div className="mt-12 reveal">
          <div className="border-t border-hairline pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <p className="font-serif text-xl md:text-2xl tracking-tight max-w-xl leading-snug">
              See the full project archive.
            </p>
            <Link to="/projects" className="btn-primary group self-start md:self-auto">
              Browse all projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
