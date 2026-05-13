import useReveal from "@/hooks/useReveal";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import FeaturedWork from "@/components/sections/FeaturedWork";
import CapabilityPillars from "@/components/sections/CapabilityPillars";
import Journey from "@/components/sections/Journey";
import RecruiterFAQ from "@/components/sections/RecruiterFAQ";
import ContactCTA from "@/components/sections/ContactCTA";
import Seo from "@/components/Seo";

export default function HomePage() {
  useReveal();
  return (
    <>
      <Seo
        title="Ahmed Mohsen Mostafa — Marketing Intern Brussels | Strategy, Research & Analytics"
        description="BBA marketing student at Odisee, Brussels — research-led marketer skilled in campaign strategy, market research, analytics and growth. Open to internships across Belgium & Europe."
        canonicalPath="/"
        image="/og-image.svg"
        imageAlt="Ahmed Mohsen Mostafa portfolio preview"
        keywords={[
          "marketing intern Brussels",
          "strategy research analytics",
          "Belgium marketing internship",
          "Europe marketing internship",
        ]}
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
