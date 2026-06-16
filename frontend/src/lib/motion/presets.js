export const EASE = {
  editorial: "power2.out",
  cinematic: "power3.out",
  snap: "power4.out",
};

export const DURATION = {
  fast: 0.4,
  base: 0.75,
  slow: 1.1,
};

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.14,
};

export const REVEAL_FROM = { y: 40, opacity: 0 };
export const REVEAL_TO = { y: 0, opacity: 1, clearProps: "transform" };

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}
