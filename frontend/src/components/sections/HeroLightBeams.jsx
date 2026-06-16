/**
 * Layer 1 — CSS God Rays (CodePen: deepakmodi8676/vYbrLrK)
 * Adapted to editorial palette; covers top 50% of viewport.
 */
export default function HeroLightBeams() {
  return (
    <div
      className="hero-beams pointer-events-none absolute inset-x-0 top-0 z-0 h-[50vh] overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-beams__jumbo absolute -inset-[10px] opacity-60 dark:opacity-45" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
