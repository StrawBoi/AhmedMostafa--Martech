import ComparisonSection from "@/components/sections/ComparisonSection";

const defaultRows = [
  {
    category: "Category",
    left: "Inventory and stock tracking",
    right: "Decision intelligence for horeca operators",
  },
  {
    category: "Pain point",
    left: "Helps teams record what happened, but not why margins changed.",
    right: "Helps teams understand profitability, demand shifts, and the next decision.",
  },
  {
    category: "Value perception",
    left: "Useful operational utility with limited strategic depth.",
    right: "Premium support layer that connects data to business outcomes.",
  },
  {
    category: "Pricing power",
    left: "Competes on low monthly fees and feature parity.",
    right: "Supports ROI-based pricing because it ties directly to margin and decision quality.",
  },
  {
    category: "Defensibility",
    left: "Easy to copy because the category is crowded and familiar.",
    right: "More defensible because the positioning is tied to insight workflows, not basic storage.",
  },
  {
    category: "Visual direction",
    left: "Functional dashboards and utilitarian reports.",
    right: "Premium intelligence hub language with sharper, more strategic presentation.",
  },
  {
    category: "Sales story",
    left: "We help you manage inventory more efficiently.",
    right: "We help you make better decisions, protect margin, and act with more confidence.",
  },
];

export default function MosolComparison({ rows = defaultRows }) {
  return <ComparisonSection rows={rows} />;
}