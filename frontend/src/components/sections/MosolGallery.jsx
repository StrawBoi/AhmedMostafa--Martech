import GallerySection from "@/components/sections/GallerySection";

export default function MosolGallery({ items = [] }) {
  return (
    <GallerySection
      items={items}
      title="Gallery"
      intro="A curated mix of strategy posters and UI mockups designed to read like a portfolio spread, not a product screenshot dump."
      emptyStateBody="This frame is ready for the final poster or screenshot asset."
      modalEmptyStateBody="This slot is ready for the final poster or screenshot asset."
      modalEmptyStateTitle="Visual not available"
      sidebarTitle="Notes"
      introNote="Click any frame to enlarge it. On mobile, swipe through the modal to move between visuals."
    />
  );
}