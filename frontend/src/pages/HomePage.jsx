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
    <main data-testid="home-page">
      <Hero />
      <ProofStrip />
      <FeaturedWork />
      <CapabilityPillars />
      <Journey />
      <RecruiterFAQ />
      <ContactCTA />
    </main>
  );
}
