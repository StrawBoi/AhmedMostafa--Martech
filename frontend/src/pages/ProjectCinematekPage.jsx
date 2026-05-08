import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { projects } from "@/lib/data";
import ContentSection from "@/components/ui/ContentSection";

export default function ProjectCinematekPage() {
  useReveal();
  const project = projects.find((p) => p.id === "cinematek-decades-of-cinema");

  if (!project) {
    return (
      <main className="container-editorial py-32 text-center">
        <p className="overline mb-4">Not found</p>
        <h1 className="font-serif text-4xl md:text-5xl">Project not available</h1>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-8 link-underline">
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main data-testid={`case-study-${project.id}`} className="pt-12 md:pt-16 pb-24">
      <section className="container-editorial pb-10">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-foreground mb-6">
          ← All projects
        </Link>

        <p className="overline mb-3">{project.type}</p>
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] max-w-4xl">
            {project.title}
          </h1>
          <div className="flex gap-2">
            {(project.labels || []).map((l) => (
              <span key={l} className="text-[11px] uppercase tracking-overline border border-hairline px-2 py-1 text-subtle">
                {l}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-foreground/75 max-w-3xl leading-relaxed">{project.shortSummary}</p>

        <div className="mt-8">
          <img src={project.heroImage} alt={project.title} className="w-full rounded-lg shadow-sm object-cover h-[360px]" />
        </div>
      </section>

      <section className="container-editorial py-8 border-y border-hairline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start">
          <div>
            <p className="overline mb-2">Status</p>
            <p className="font-serif">{project.status}</p>
          </div>
          <div>
            <p className="overline mb-2">Year</p>
            <p>{project.year}</p>
          </div>
          <div>
            <p className="overline mb-2">Role</p>
            <p>{project.role}</p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="reveal">
              <p className="overline mb-3">Overview</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.overview}</p>
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Problem</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.problem}</p>
            </div>

            <div className="mt-10">
              <ContentSection title="Audience" intro={project.audience} />
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Strategic insight</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.contribution}</p>
            </div>

            <div className="mt-10">
              <ContentSection title="Narrative arc" intro={project.narrativeArc} />
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Campaign structure</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.campaignStructure}</p>
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Platform breakdown</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.campaignStructure}</p>
            </div>

            <div className="mt-10">
              <ContentSection title="Tone of voice" intro={project.toneOfVoice} />
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Deliverables</p>
              <ul className="list-disc pl-5 text-base text-foreground/85">
                {project.deliverables.map((d) => (
                  <li key={d} className="mb-2">{d}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 reveal">
              <p className="overline mb-3">Outcome</p>
              <p className="text-lg leading-relaxed text-foreground/85">{project.outcomes}</p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="reveal">
              <p className="overline mb-3">Project facts</p>
              <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-foreground/85">
                <div>
                  <dt className="text-subtle">Primary pillar</dt>
                  <dd>{project.primaryPillar}</dd>
                </div>
                <div>
                  <dt className="text-subtle">Secondary pillar</dt>
                  <dd>{project.secondaryPillar}</dd>
                </div>
                <div>
                  <dt className="text-subtle">Tags</dt>
                  <dd>{project.tags?.slice(0, 6).join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-subtle">Year</dt>
                  <dd>{project.year}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 reveal">
              <p className="overline mb-3">Gallery</p>
              <div className="grid grid-cols-1 gap-4">
                {project.gallery.map((img, i) => (
                  <figure key={i} className="bg-surface overflow-hidden rounded">
                    <img src={img.src} alt={img.alt} className="w-full h-40 object-cover" />
                    {img.caption && <figcaption className="p-2 text-sm text-subtle">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
