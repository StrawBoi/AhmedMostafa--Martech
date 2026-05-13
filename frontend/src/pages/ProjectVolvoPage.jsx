import useReveal from "@/hooks/useReveal";
import { projects } from "@/lib/data";
import BackLink from "@/components/shared/BackLink";
import SectionIntro from "@/components/shared/SectionIntro";
import StatsStrip from "@/components/shared/StatsStrip";
import ClosingNote from "@/components/shared/ClosingNote";
import Seo from "@/components/Seo";
import {
  buildSignalItems,
  CaseStudyDeliverablesGrid,
  CaseStudyGallery,
  CaseStudyPositioningTable,
} from "@/components/sections/CaseStudyRhythm";

function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

export default function ProjectVolvoPage() {
  useReveal();
  const project = projects.find((p) => p.id === "volvo-belgium-campaign");

  if (!project) {
    return (
      <>
        <Seo
          title="Project not available"
          description="The requested project case study is not available."
          canonicalPath="/projects/volvo-belgium-campaign"
          noIndex
        />
        <main className="container-editorial py-32 text-center">
          <p className="overline mb-4">Not found</p>
          <h1 className="font-serif text-4xl md:text-5xl">Project not available</h1>
          <BackLink />
        </main>
      </>
    );
  }

  const positioningRows = [
    { category: "Problem", value: project.problem },
    { category: "Goal", value: project.goal },
    { category: "My role", value: project.contribution },
    { category: "Research and strategy", value: project.researchAndStrategy },
    { category: "Campaign idea", value: project.shortSummary },
  ].filter((row) => row.value);

  return (
    <>
      <Seo
        title={`${project.title} | Ahmed Mohsen Mostafa`}
        description={project.shortSummary || project.overview || "Case study and strategic project portfolio entry."}
        canonicalPath="/projects/volvo-belgium-campaign"
        image={project.heroImage}
        imageAlt={project.title}
        keywords={project.tags || []}
      />
    <main data-testid={`case-study-${project.id}`} className="pt-10 md:pt-16 pb-24">
      <section className="container-editorial section-vertical">
        <SectionIntro project={project} />
      </section>

      <StatsStrip items={buildSignalItems(project)} />

      <section className="container-editorial section-vertical reveal">
        <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
          <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="container-editorial section-vertical">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="overline mb-3 reveal">Overview</p>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-terracotta reveal">
              {project.overview}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            <div className="reveal">
              <p className="overline mb-3">Problem</p>
              <p className="text-base leading-relaxed text-foreground/85">{project.problem}</p>
            </div>
            <div className="reveal">
              <p className="overline mb-3">Goal</p>
              <p className="text-base leading-relaxed text-foreground/85">{project.goal}</p>
            </div>
            <div className="reveal">
              <p className="overline mb-3">Outcome</p>
              <p className="text-base leading-relaxed text-foreground/85">{project.outcomes}</p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyPositioningTable rows={positioningRows} title="Strategy shift" />
      <CaseStudyDeliverablesGrid items={project.deliverables || project.methods || []} />
      <CaseStudyGallery items={project.gallery || []} />
      <ClosingNote title={project.outcomes} body={project.shortSummary} />
    </main>
    </>
  );
}
