import useReveal from "@/hooks/useReveal";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CapabilityPillars from "@/components/sections/CapabilityPillars";
import Journey from "@/components/sections/Journey";
import RecruiterFAQ from "@/components/sections/RecruiterFAQ";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  useReveal();
  return (
    <>
      <title>Ahmed Mostafa — Marketing Intern Brussels | Strategy, Research & Analytics</title>
      <meta
        name="description"
        content="BBA student at Odisee Brussels specializing in marketing management, research, data analysis, and analytics. Available for Summer 2026 internships across Belgium and Europe."
      />
      <main data-testid="home-page">
        <Hero />
        <ProofStrip />
        <Journey />
        <FeaturedWork />
        <CapabilityPillars />
        <RecruiterFAQ />
        <ContactCTA />
      </main>
    </>
  );
}
