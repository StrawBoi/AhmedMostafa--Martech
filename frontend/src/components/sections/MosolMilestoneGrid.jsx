import PropTypes from "prop-types";

const defaultPhases = [
  {
    week: "Week 1",
    phase: "Brand Identity",
    description: "Set the visual and strategic language before any market-facing testing.",
    milestones: ["Brand identity finalized", "Intelligence Hub messaging"],
  },
  {
    week: "Week 2",
    phase: "Personas",
    description: "Define who the offer is for and what buying behavior it needs to match.",
    milestones: ["Belgian customer personas", "15 Brussels interviews"],
  },
  {
    week: "Week 3",
    phase: "Prototype",
    description: "Turn the concept into something concrete enough to test and explain.",
    milestones: ["Square integration requirements", "QR feedback mockup", "Profit dashboard"],
  },
  {
    week: "Week 4",
    phase: "Validation",
    description: "Build credibility through proof, pricing logic, and market-ready assets.",
    milestones: ["Marketing website with demo", "Pricing validation", "Campaign assets"],
  },
  {
    week: "Week 5",
    phase: "Launch",
    description: "Prepare the first controlled rollout and reduce friction before a beta start.",
    milestones: ["Beta onboarding", "Soft launch planning"],
  },
];

export default function MosolMilestoneGrid({ phases = defaultPhases }) {
  return (
    <section className="container-editorial section-vertical">
      <div className="reveal mb-4 max-w-3xl">
        <p className="overline mb-3">Go-to-market sprint</p>
        <p className="text-base leading-relaxed text-foreground/80">
          A five-week validation and launch roadmap that moves MOSOL from identity and positioning into prototype work, market proof, and beta preparation.
        </p>
      </div>

      <div className="reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {phases.map((phase, index) => (
          <article
            key={phase.phase}
            className="relative overflow-hidden rounded-sm border border-hairline bg-background/50 p-5"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-terracotta/50 via-terracotta to-terracotta/50" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/60">{phase.week}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-foreground">{phase.phase}</h3>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-terracotta/25 bg-terracotta/10 text-xs font-medium text-terracotta">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-foreground/75">{phase.description}</p>

            <div className="mt-5 space-y-2">
              {phase.milestones.map((milestone) => (
                <div
                  key={milestone}
                  className="rounded-sm border border-hairline bg-background px-3 py-2 text-base leading-snug text-foreground/85"
                >
                  {milestone}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

MosolMilestoneGrid.propTypes = {
  phases: PropTypes.arrayOf(
    PropTypes.shape({
      week: PropTypes.string.isRequired,
      phase: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      milestones: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    })
  ),
};