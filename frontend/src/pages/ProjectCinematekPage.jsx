import useReveal from "@/hooks/useReveal";
import { projects } from "@/lib/data";
import BackLink from "@/components/shared/BackLink";
import SectionIntro from "@/components/shared/SectionIntro";
import StatsStrip from "@/components/shared/StatsStrip";
import ClosingNote from "@/components/shared/ClosingNote";
import {
  CaseStudyDeliverablesGrid,
  CaseStudyGallery,
  CaseStudyPositioningTable,
} from "@/components/sections/CaseStudyRhythm";

// Helper to detect status semantic type
function detectStatusType(status) {
  if (!status) return "complete";
  const lower = status.toLowerCase();
  if (lower.includes("concept") || lower.includes("prototype") || lower.includes("framework")) return "concept";
  if (lower.includes("active") || lower.includes("ongoing")) return "active";
  if (lower.includes("draft")) return "draft";
  return "complete";
}

export default function ProjectCinematekPage() {
  useReveal();
  const project = projects.find((p) => p.id === "cinematek-decades-of-cinema");

  if (!project) {
    return (
      <main className="container-editorial py-32 text-center">
        <p className="overline mb-4">Not found</p>
        <h1 className="font-serif text-4xl md:text-5xl">Project not available</h1>
        <BackLink />
      </main>
    );
  }

  const positioningRows = [
    { category: "Audience", value: project.audience },
    { category: "Narrative arc", value: project.narrativeArc },
    { category: "Campaign structure", value: project.campaignStructure },
    { category: "Tone of voice", value: project.toneOfVoice },
  ].filter((row) => row.value);

  const cinematekSignals = [
    { value: "100+", label: "DECADES COVERED", note: "A century of film history framed across the campaign." },
    { value: "18–45", label: "TARGET AUDIENCE", note: "Primary audience focus for outreach and programming." },
    { value: "Brand awareness", label: "CAMPAIGN TYPE", note: "Campaign objective centered on long-term recognition." },
    { value: "OOH + Digital", label: "KEY CHANNEL", note: "Out of home and digital channels used in tandem." },
  ];

  return (
    <main data-testid={`case-study-${project.id}`} className="pt-12 md:pt-16 pb-24">
      <section className="container-editorial section-vertical reveal">
        <SectionIntro project={project} />
      </section>

      <StatsStrip items={cinematekSignals} tone="dark" />

      <section className="container-editorial section-vertical reveal">
        {/* Hero image */}
        <div>
          <img src={project.heroImage} alt={project.title} className="w-full rounded-lg shadow-sm object-cover h-[360px]" />
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
              <p className="overline mb-3">Strategic insight</p>
              <p className="text-base leading-relaxed text-foreground/85">{project.contribution}</p>
            </div>
            <div className="reveal">
              <p className="overline mb-3">Platform breakdown</p>
              <p className="text-base leading-relaxed text-foreground/85">{project.campaignStructure}</p>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyPositioningTable rows={positioningRows} title="Positioning table" />
      <CaseStudyDeliverablesGrid items={project.deliverables || []} />
      <CaseStudyGallery items={project.gallery || []} />
      <ClosingNote title={project.outcomes} body={project.shortSummary} />
    </main>
  );
}
