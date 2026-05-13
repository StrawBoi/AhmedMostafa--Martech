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
      <title>Ahmed Mohsen Mostafa — Marketing Intern Brussels | Strategy, Research & Analytics</title>
      <meta
        name="description"
        content="BBA marketing student at Odisee, Brussels — research-led marketer skilled in campaign strategy, market research, analytics and growth. Open to internships across Belgium & Europe."
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
