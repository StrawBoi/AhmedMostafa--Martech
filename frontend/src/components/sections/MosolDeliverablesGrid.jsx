import { BarChart3, Map, Megaphone, Rocket, Route, Target, Workflow } from "lucide-react";
import PropTypes from "prop-types";
import DeliverablesGrid from "@/components/sections/DeliverablesGrid";

const defaultDeliverables = [
  {
    title: "Competitor map",
    description: "Clarified the Belgian horeca software landscape and where the category was saturated versus open.",
    Icon: Map,
  },
  {
    title: "Pricing and market analysis",
    description: "Benchmarked pricing bands, provider density, and the best entry range for an ROI-led offer.",
    Icon: BarChart3,
  },
  {
    title: "Positioning framework",
    description: "Shifted the story from simple inventory management to a premium intelligence hub.",
    Icon: Target,
  },
  {
    title: "Sprint roadmap",
    description: "Defined the validation flow from identity through beta launch readiness.",
    Icon: Route,
  },
  {
    title: "Dashboard concept",
    description: "Mapped the profit dashboard logic needed to make the concept feel actionable and credible.",
    Icon: Workflow,
  },
  {
    title: "Campaign messaging",
    description: "Built the core story for explaining value to horeca operators and potential partners.",
    Icon: Megaphone,
  },
  {
    title: "Beta launch plan",
    description: "Structured the onboarding and soft-launch logic so the concept could move toward a controlled release.",
    Icon: Rocket,
  },
];

export default function MosolDeliverablesGrid({ items = defaultDeliverables }) {
  return (
    <DeliverablesGrid
      items={items}
      title="Deliverables"
      intro="Each deliverable supports the market story, the positioning logic, or the path to validation."
      tone="dark"
    />
  );
}

MosolDeliverablesGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      Icon: PropTypes.elementType,
    })
  ),
};