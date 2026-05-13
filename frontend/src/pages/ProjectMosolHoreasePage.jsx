import { Link } from "react-router-dom";
import useReveal from "@/hooks/useReveal";
import { projects } from "@/lib/data";
import BackLink from "@/components/shared/BackLink";
import SectionIntro from "@/components/shared/SectionIntro";
import StatsStrip from "@/components/shared/StatsStrip";
import FactsGrid from "@/components/shared/FactsGrid";
import MosolComparison from "@/components/sections/MosolComparison";
import MosolPositioningSummary from "@/components/sections/MosolPositioningSummary";
import MosolMilestoneGrid from "@/components/sections/MosolMilestoneGrid";
import MosolDeliverablesGrid from "@/components/sections/MosolDeliverablesGrid";
import MosolGallery from "@/components/sections/MosolGallery";
import ClosingNote from "@/components/shared/ClosingNote";

export default function ProjectMosolHoreasePage() {
  useReveal();
  const project = projects.find((item) => item.id === "mosol-profit-intelligence");
  const projectMeta = project?.projectMeta || {
    projectType: "Product strategy concept",
    sector: "Belgian horeca / restaurant tech",
    focus: "Positioning, market validation, pricing, go-to-market",
    role: "Product Strategist",
    keyOutputs: "Competitor map, positioning logic, sprint roadmap, campaign ideas",
    status: "Concept / strategic proposal",
  };

  const projectFacts = [
    { label: "Project type", value: projectMeta.projectType },
    { label: "Sector", value: projectMeta.sector },
    { label: "Focus", value: projectMeta.focus },
    { label: "Role", value: projectMeta.role },
    { label: "Key outputs", value: projectMeta.keyOutputs },
    { label: "Status", value: projectMeta.status },
  ];

  const positioningSummaryItems = [
    {
      label: "Category",
      value: projectMeta.projectType,
    },
    {
      label: "Audience",
      value: "Belgian horeca operators choosing software for operational value and ROI, not feature count.",
    },
    {
      label: "Value proposition",
      value: "Turn POS data into clear decisions on profit, demand, and margin pressure.",
    },
    {
      label: "Differentiators",
      value: "AI-first analytics, stronger category positioning, and an intelligence-layer story that is harder to copy.",
    },
    {
      label: "Why it matters",
      value: "It aligns the concept with ROI-led buying behavior and gives the offer more premium pricing power.",
    },
  ];

  const researchPoints = [
    project?.research || "",
    "Mapped how POS exports are used today: mostly retrospective, spreadsheet-heavy, and inconsistent.",
    "Benchmarked regional POS and analytics tools to identify whitespace in profit-level guidance.",
  ].filter(Boolean);

  const strategyPoints = [
    project?.strategy || "",
    "Prioritize decision clarity: what to keep, fix, test, or remove this week.",
    "Design for busy operators with short cycles, not analyst teams with long reporting windows.",
  ].filter(Boolean);

  const whatIWorkedOn = [
    "Mapped the Belgian horeca software landscape to understand where current POS tools stop short on profit insight and decision support.",
    "Shaped the positioning around an intelligence layer, not just an inventory or reporting tool, so the concept read as more strategic and premium.",
    "Pressure-tested the pricing logic against the market to see where a higher-value analytics offer could still feel credible for independent operators.",
    "Helped structure the go-to-market plan around a small validation sprint, including pilot assumptions, interview goals, and launch sequencing.",
    "Translated the research into messaging direction that sounds clear and practical, while still strong enough for a recruiter-facing portfolio case study.",
  ];

  const learnings = [
    "In crowded markets, category creation can be as important as the product itself.",
    "Clear positioning can lift both perceived value and pricing power.",
    "Early go-to-market planning gets stronger when validation and compliance are considered from the start.",
  ];

  if (!project) {
    return (
      <main className="container-editorial py-32 text-center">
        <p className="overline mb-4">Not found</p>
        <h1 className="font-serif text-4xl md:text-5xl">Project not available</h1>
        <BackLink />
      </main>
    );
  }

  return (
    <main
      data-testid="case-study-mosol"
      className="pt-10 md:pt-14 pb-20"
    >
      {/* Hero */}
      <section className="container-editorial section-vertical">
        <SectionIntro project={project} />
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-background px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-terracotta reveal" style={{ transitionDelay: "160ms" }}>
          Concept project for Belgian horeca
        </div>
      </section>

      <StatsStrip
        title="Market signals"
        intro="A short read on the market size, pricing range, and whitespace behind the concept."
      />

      {/* Project facts strip */}
      <FactsGrid facts={projectFacts} />

      {/* Overview */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">Overview</p>
          <p className="text-base leading-relaxed text-foreground/85">
            {project.overview}
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">Problem</p>
          <p className="text-base leading-relaxed text-foreground/85">
            {project.problem}
          </p>
        </div>
      </section>

      {/* Research */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">Research</p>
          <ul className="space-y-3 text-base text-foreground/85 leading-relaxed list-disc pl-5 marker:text-terracotta">
            {researchPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Strategy */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">Strategy</p>
          <ul className="space-y-3 text-base text-foreground/85 leading-relaxed list-disc pl-5 marker:text-terracotta">
            {strategyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <MosolComparison />

      {/* Gallery - moved up for better visual hierarchy */}
      <MosolGallery items={project.gallery || []} />

      <MosolPositioningSummary items={positioningSummaryItems} />

      <MosolMilestoneGrid />

      {/* What I worked on */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">What I worked on</p>
          <ul className="space-y-3 text-base text-foreground/85 leading-relaxed list-disc pl-5 marker:text-terracotta">
            {whatIWorkedOn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <MosolDeliverablesGrid />

      {/* Key learnings */}
      <section className="container-editorial section-vertical">
        <div className="reveal max-w-4xl">
          <p className="overline mb-3">Key Learnings</p>
          <ul className="space-y-3 text-base text-foreground/85 leading-relaxed list-disc pl-5 marker:text-terracotta">
            {learnings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <ClosingNote
        title="A concise example of how I connect research, positioning, and launch thinking."
        body="This case study shows the kind of strategic thinking I bring to product marketing, market research, strategic communication, and go-to-market planning."
        ctaLabel="Contact if helpful"
        ctaTo="/contact"
      />
    </main>
  );
}
