import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { createLenis, destroyLenis, lenisRaf } from "@/lib/motion/lenis";

export default function MotionProvider({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    registerGsap();
    document.documentElement.classList.add("motion-ready");
    const lenis = createLenis();

    let rafId;
    const raf = (time) => {
      lenisRaf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      destroyLenis();
      document.documentElement.classList.remove("motion-ready");
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return children;
}
