/**
 * Layer 3 — Signal lock: scan line sweep + film grain + coordinate readout.
 * Creates the "data documentary opening" before identity resolves.
 */
export default function HeroSignalLayer({ scanRef, signalRef }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <div className="hero-grain absolute inset-0 opacity-[0.035] dark:opacity-[0.06]" />

      <div
        ref={scanRef}
        className="hero-scan absolute left-0 right-0 top-0 h-px bg-terracotta/70 shadow-[0_0_24px_2px_hsl(var(--terracotta)/0.35)] opacity-0"
      />

      <p
        ref={signalRef}
        className="hero-signal absolute bottom-[16%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#F2F0EA]/55 opacity-0 sm:text-[11px]"
      >
        50.8503°N · 4.3517°E · Brussels · Signal locked
      </p>
    </div>
  );
}
