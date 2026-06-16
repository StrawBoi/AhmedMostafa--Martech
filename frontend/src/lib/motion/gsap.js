import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({
    ease: "power2.out",
    duration: 0.75,
  });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
  return gsap;
}

if (typeof window !== "undefined") {
  registerGsap();
}

export { gsap, ScrollTrigger };
